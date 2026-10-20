const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const source = fs.readFileSync(path.join(__dirname, '../FLOOR/module.php'), 'utf8');
const markup = /\$html = <<<'HTML'\n([\s\S]*?)\nHTML;/.exec(source)[1];
const editor = /return <<<'JAVASCRIPT'\n([\s\S]*?)\nJAVASCRIPT;/.exec(source)[1];
const lampPath = 'Haus / Obergeschoss / Lampe "Nord" & Licht';
const assignedPath = `${lampPath} / Ein`;
const brightnessPath = `${lampPath} / Helligkeit`;
const project = {mode: 'edit', activeFloor: 'ground', floors: [{id: 'ground', name: 'Erdgeschoss',
    items: [{id: 'lamp', name: 'Lampe', x: 0, y: 0, size: 24, kind: 'light', variableID: 123,
        _variableType: 0, _canAction: true, _rawValue: false, _variablePath: assignedPath,
        colorVariableID: 124, _colorVariablePath: brightnessPath}]}]};
const node = (id, name, objectType, objectPath, children = []) => ({id, name, objectType,
    path: objectPath, children, hasChildren: children.length > 0, childrenLoaded: children.length > 0,
    variableType: 0, variableTypeName: 'Boolean', valueText: 'Aus', runtimeMetaLoaded: false});
const siblings = Array.from({length: 40}, (_, i) => node(200 + i, `Andere Variable ${i}`, 2, `${lampPath} / Andere Variable ${i}`));
const lamp = node(12, 'Lampe "Nord" & Licht', 1, lampPath, [...siblings,
    node(123, 'Ein', 2, assignedPath), node(124, 'Helligkeit', 2, brightnessPath)]);
const floor = node(11, 'Obergeschoss', 0, 'Haus / Obergeschoss', [lamp]);
const house = node(10, 'Haus', 0, 'Haus', [floor]);
const other = {...node(50, 'Anderes', 0, 'Anderes'), hasChildren: true};
const objects = [house, other];
const html = markup.replace('__FLOORPLAN_EDITOR_JAVASCRIPT__',
    'window.actions = []; window.requestAction = (ident, payload) => window.actions.push({ident, payload: JSON.parse(payload)});\n' +
    editor.replaceAll('__INITIAL_PROJECT__', JSON.stringify(project)).replaceAll('__INSTANCE_ID__', '7'));

(async () => {
    const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined,
        args: ['--no-sandbox']});
    try {
        const page = await browser.newPage({viewport: {width: 1100, height: 700}});
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.setContent(html);
        await page.locator('[data-type="item"][data-id="lamp"]').click();
        const field = page.locator('#variableField');
        const modal = page.locator('#variableModal');
        const lastAction = () => page.evaluate(() => window.actions.at(-1));
        const respond = message => page.evaluate(data => window.handleMessage(data), message);
        const location = action => ({type: 'objectTreeLocation', ...action.payload, objects,
            expandedIDs: [10, 11, 12], focusID: action.payload.objectID});
        const children = (action, objects) => ({type: 'objectTreeChildren',
            parentID: action.payload.parentID, requestID: action.payload.requestID,
            pickerToken: action.payload.pickerToken, objects});
        const metadata = action => ({type: 'variableMetaForAssignment', ...action.payload,
            meta: {_variableType: 0, _canAction: true, _rawValue: false, _valueText: 'Aus'}});

        assert.equal(await field.getAttribute('title'), assignedPath, 'assigned field tooltip has full path');
        await field.click();
        const first = await lastAction();
        assert.equal(first.ident, 'getObjectTreeLocation');
        assert.equal(first.payload.objectID, 123, 'opening targets current assignment');
        await respond(location(first));
        const selected = page.locator('.tree-row[data-object-id="123"]');
        assert.equal(await selected.isVisible(), true, 'assigned variable is visible through expanded ancestors');
        assert.ok((await selected.getAttribute('class')).includes('selected-variable'));
        assert.equal(await selected.getAttribute('title'), assignedPath);
        assert.equal(await selected.locator('.tree-value').getAttribute('title'), `${assignedPath}\nBoolean`);
        await page.waitForFunction(() => {
            const row = document.querySelector('.tree-row[data-object-id="123"]').getBoundingClientRect();
            const list = document.querySelector('#variableList').getBoundingClientRect();
            return row.top >= list.top && row.bottom <= list.bottom;
        });

        await page.locator('[data-tree-toggle="50"]').click();
        const childrenAction = await lastAction();
        assert.deepEqual(childrenAction, {ident: 'getObjectTreeChildren', payload: {parentID: 50, parentPath: 'Anderes',
            requestID: first.payload.requestID, pickerToken: first.payload.pickerToken}},
            'unrelated branch still loads on demand');
        await respond(children(childrenAction, [node(51, 'Temperatur', 2, 'Anderes / Temperatur')]));
        assert.equal(await page.locator('.tree-row[data-object-id="51"]').isVisible(), true);

        await page.locator('#variableCloseBtn').click();
        await field.click();
        const second = await lastAction();
        await respond(location(first));
        assert.equal(await modal.getAttribute('aria-hidden'), 'true', 'stale location does not reopen picker');
        await respond(location(second));
        await page.locator('#variableCloseBtn').click();
        await respond(location(second));
        assert.equal(await modal.getAttribute('aria-hidden'), 'true', 'closed picker ignores delayed location');

        const brightness = page.locator('[data-variable-field="colorVariableID"]');
        assert.equal(await brightness.getAttribute('title'), brightnessPath);
        await brightness.click();
        const brightnessAction = await lastAction();
        assert.equal(brightnessAction.payload.objectID, 124, 'optional variable uses its own location');
        await respond(location(brightnessAction));
        assert.ok((await page.locator('.tree-row[data-object-id="124"]').getAttribute('class')).includes('selected-variable'));
        await page.locator('#variableCloseBtn').click();

        await field.click();
        await respond(location(await lastAction()));
        await page.locator('[data-tree-toggle="50"]').click();
        const pendingChildren = await lastAction();
        await page.locator('#variableCloseBtn').click();
        await respond(children(pendingChildren, [node(51, 'Temperatur', 2, 'Anderes / Temperatur')]));
        assert.equal(await modal.getAttribute('aria-hidden'), 'true', 'late children do not reopen cancelled picker');
        await field.click();
        const reopened = await lastAction();
        await respond(children(pendingChildren, [node(51, 'Temperatur', 2, 'Anderes / Temperatur')]));
        assert.equal(await modal.getAttribute('aria-hidden'), 'true', 'old children cannot open a new picker session');
        await respond(location(reopened));
        await respond(children(pendingChildren, [node(51, 'Temperatur', 2, 'Anderes / Temperatur')]));
        assert.equal(await page.locator('.tree-row[data-object-id="51"]').count(), 0, 'old children do not alter reopened tree');

        await page.waitForTimeout(1300);
        await page.evaluate(() => { window.actions = []; });
        await page.locator('.tree-row[data-object-id="200"]').click();
        const cancelledSelection = await lastAction();
        assert.equal(cancelledSelection.ident, 'getVariableMetaForAssignment');
        await page.locator('#variableCloseBtn').click();
        await respond(metadata(cancelledSelection));
        assert.ok((await field.inputValue()).startsWith('#123'), 'cancel preserves original variable assignment');
        await page.waitForTimeout(1300);
        assert.equal(await page.evaluate(() => window.actions.some(a => a.ident === 'save')), false,
            'cancelled selection is not saved later');

        await field.click();
        await respond(location(await lastAction()));
        await respond(metadata(cancelledSelection));
        assert.equal(await modal.getAttribute('aria-hidden'), 'false', 'old metadata cannot select in reopened picker');
        assert.ok((await field.inputValue()).startsWith('#123'));
        await page.locator('.tree-row[data-object-id="200"]').click();
        const olderSelection = await lastAction();
        await page.locator('.tree-row[data-object-id="123"]').click();
        const latestSelection = await lastAction();
        assert.equal(latestSelection.ident, 'getVariableMetaForAssignment');
        assert.equal(latestSelection.payload.variableID, 123, 'clicking a variable still selects it');
        await respond({...metadata(latestSelection), pickerToken: 'other-view'});
        assert.equal(await modal.getAttribute('aria-hidden'), 'false', 'another view cannot complete this selection');
        await respond(metadata(olderSelection));
        assert.equal(await modal.getAttribute('aria-hidden'), 'false', 'older selection cannot override latest click');
        await respond(metadata(latestSelection));
        assert.equal(await modal.getAttribute('aria-hidden'), 'true');
        assert.equal(await field.getAttribute('title'), assignedPath, 'selected path survives assignment');

        await field.click();
        const pendingLocation = await lastAction();
        await respond(location(pendingLocation));
        await page.locator('#variableSearch').fill('Temperatur');
        await respond(location(pendingLocation));
        assert.equal(await page.locator('#variableSearch').inputValue(), 'Temperatur', 'stale location leaves search untouched');
        await page.waitForFunction(() => window.actions.at(-1)?.ident === 'searchObjectTree');
        const searchAction = await lastAction();
        await respond({type: 'objectTreeSearchResults', requestID: searchAction.payload.requestID,
            pickerRequestID: searchAction.payload.pickerRequestID,
            pickerToken: searchAction.payload.pickerToken,
            objects: [node(51, 'Temperatur', 2, 'Anderes / Temperatur')], truncated: false});
        assert.equal(await page.locator('.tree-row[data-object-id="51"]').getAttribute('title'), 'Anderes / Temperatur');
        await page.locator('#variableCloseBtn').click();

        await field.click();
        assert.equal(await page.locator('#variableSearch').inputValue(), '', 'reopening clears previous search');
        await respond(location(await lastAction()));
        await respond({type: 'objectTreeSearchResults', ...searchAction.payload,
            objects: [node(51, 'Temperatur', 2, 'Anderes / Temperatur')], truncated: false});
        assert.equal(await selected.isVisible(), true, 'old search cannot replace reopened tree');
        await page.locator('#variableClearBtn').click();
        assert.equal(await field.getAttribute('title'), 'Variable auswählen');
        await field.click();
        const rootAction = await lastAction();
        assert.equal(rootAction.ident, 'getObjectTreeChildren');
        assert.equal(rootAction.payload.parentID, 0, 'unassigned picker starts at root');
        await respond(children(rootAction, [other]));
        assert.equal(await page.locator('.tree-row[data-object-id="50"]').isVisible(), true);
        await page.evaluate(() => { window.actions = []; });
        await page.locator('#variableSearch').fill('Lampe');
        await page.locator('#variableCloseBtn').click();
        await page.waitForTimeout(300);
        assert.equal(await page.evaluate(() => window.actions.some(a => a.ident === 'searchObjectTree')), false,
            'closing picker cancels pending search timer');

        const restored = structuredClone(project);
        Object.assign(restored.floors[0].items[0], {_valueText: 'Ein', _rawValue: true, showValue: true});
        await page.locator('#finishBtn').click();
        await respond({type: 'project', project: restored});
        const restoredDevice = page.locator('[data-type="item"][data-id="lamp"]');
        assert.equal(await restoredDevice.locator('.runtime-value').textContent(), 'Ein', 'restored live view shows current value');
        assert.ok(!(await restoredDevice.getAttribute('class')).includes('status-only'), 'restored device keeps action enabled');
        await restoredDevice.locator('circle').first().click();
        assert.deepEqual(await lastAction(), {ident: 'operate', payload: {floorId: 'ground', itemId: 'lamp'}},
            'restored device sends action without reloading');
        assert.deepEqual(errors, [], 'no JavaScript runtime errors');
        console.log('PASS: picker navigation, cancellation, stale responses, search and restored device operation');
    } finally {
        await browser.close();
    }
})().catch(e => {console.error(e); process.exitCode = 1;});
