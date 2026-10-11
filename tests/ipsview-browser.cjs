const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const source = fs.readFileSync(process.argv[2] || path.join(__dirname, '../FLOOR/module.php'), 'utf8');
const markup = /\$html = <<<'HTML'\n([\s\S]*?)\nHTML;/.exec(source)[1];
const editor = /return <<<'JAVASCRIPT'\n([\s\S]*?)\nJAVASCRIPT;/.exec(source)[1];
const item = (id, x, type, canAction = true) => ({id, x, y: 0, kind: 'light', name: id, size: 24,
    variableID: 100 + x, _variableType: type, _canAction: canAction, _rawValue: type === 0 ? false : 20,
    _profile: {min: 0, max: 100, step: 1, associations: []}, showValue: true});
const project = {mode: 'view', grid: 20, activeFloor: 'ground', defaultFloor: 'ground', floors: [
    {id: 'ground', name: 'Erdgeschoss', items: [item('switch', 0, 0), item('dimmer', 120, 1), item('readonly', 240, 0, false)]},
    {id: 'upper', name: 'Obergeschoss', items: [item('upstairs', 0, 0)]}
]};
const bootstrap = `window.actions = []; window.rejectedActions = [];
for (const type of ['pointerdown', 'pointerup', 'click']) document.addEventListener(type, () => window.inputPhase = type, true);
window.requestAction = (ident, payload) => {
    const action = {ident, payload: JSON.parse(payload), phase: window.inputPhase};
    if (window.inputPhase !== 'click') { window.rejectedActions.push(action); return; }
    window.actions.push(action);
};`;
const html = markup.replace('__FLOORPLAN_EDITOR_JAVASCRIPT__', bootstrap + editor
    .replaceAll('__INITIAL_PROJECT__', JSON.stringify(project)).replaceAll('__INSTANCE_ID__', '7'));

(async () => {
    const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
    try {
        for (const touch of [false, true]) {
            const context = await browser.newContext({viewport: {width: 1000, height: 700}, hasTouch: touch});
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.setContent(html);
            await page.waitForSelector('[data-type="item"][data-id="switch"]');
            const activate = async locator => touch ? locator.tap() : locator.click();
            const device = id => page.locator(`[data-type="item"][data-id="${id}"]`).first();
            await activate(device('switch'));
            const actions = await page.evaluate(() => window.actions);
            assert.equal(actions.length, 1, 'one activation sends exactly one action');
            assert.deepEqual(actions[0], {ident: 'operateValue', payload: {floorId: 'ground', itemId: 'switch', value: true, toggleBoolean: true}, phase: 'click'});
            assert.deepEqual(await page.evaluate(() => window.rejectedActions), [], 'host receives no early pointerdown action');
            const bounds = await device('switch').boundingBox();
            await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
            await page.mouse.down();
            await page.mouse.move(990, 10);
            await page.mouse.up();
            assert.equal((await page.evaluate(() => window.actions)).length, 1, 'press then drag away does not toggle');
            await device('readonly').dispatchEvent('click', {button: 0});
            assert.equal((await page.evaluate(() => window.actions)).length, 1, 'read-only variable does not send action');
            await page.evaluate(() => window.handleMessage({type: 'variableUpdate', variableID: 100, meta: {_rawValue: true}}));
            await activate(device('switch'));
            assert.deepEqual((await page.evaluate(() => window.actions)).at(-1).payload,
                {floorId: 'ground', itemId: 'switch', value: false, toggleBoolean: true}, 'on device sends toggle through value route');
            await activate(device('dimmer'));
            assert.equal(await page.locator('#controlModal').getAttribute('aria-hidden'), 'false', 'numeric device opens popup');
            await activate(page.locator('[data-control-step="1"]'));
            assert.equal((await page.evaluate(() => window.actions)).at(-1).ident, 'operateValue', 'popup device still operates');
            await page.mouse.click(10, 10);
            await activate(page.locator('#liveFloorButton'));
            assert.equal(await page.locator('#liveFloorMenu').isVisible(), true, 'HTML floor menu opens');
            const outline = await page.locator('#liveFloorMenu [aria-current="true"]').evaluate(button => {
                const style = getComputedStyle(button);
                return {offset: parseFloat(style.outlineOffset), width: parseFloat(style.outlineWidth), gap: parseFloat(style.marginBottom)};
            });
            assert.ok(outline.offset <= -outline.width && outline.gap >= 3, 'selection outline is inset and menu rows have spacing');
            await activate(page.locator('[data-floor-id="upper"]'));
            assert.equal(await page.locator('#liveFloorButton').textContent(), 'Obergeschoss');
            assert.equal(await device('upstairs').count(), 1, 'chosen floor is rendered');
            assert.equal(await page.locator('#liveFloorMenu').isVisible(), false);
            await activate(device('upstairs'));
            assert.equal((await page.evaluate(() => window.actions)).at(-1).payload.floorId, 'upper', 'action targets selected floor');
            await page.locator('#liveFloorButton').focus();
            await page.keyboard.press('Enter');
            await page.keyboard.press('ArrowUp');
            await page.keyboard.press('Enter');
            assert.equal(await page.locator('#liveFloorButton').textContent(), 'Erdgeschoss', 'keyboard selection works');
            await activate(page.locator('#liveFloorButton'));
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#liveFloorMenu').isVisible(), false, 'Escape dismisses menu');
            await activate(page.locator('#liveFloorButton'));
            await page.mouse.click(990, 10);
            assert.equal(await page.locator('#liveFloorMenu').isVisible(), false, 'outside press dismisses menu');
            await page.evaluate(p => window.handleMessage({type: 'project', project: {...p, floors: [p.floors[0]]}}), project);
            assert.equal(await page.locator('.live-floor-picker').isVisible(), false, 'single floor needs no selector');
            assert.deepEqual(errors, [], 'no JavaScript runtime errors');
            console.log(`PASS: ${touch ? 'touch' : 'mouse'} activation, host bridge, popup, floor menu and keyboard`);
            await context.close();
        }
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
