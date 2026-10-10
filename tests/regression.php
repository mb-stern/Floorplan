<?php
declare(strict_types=1);
const VM_UPDATE = 10603;
class IPSModuleStrict {
    public array $messages = [];
    public array $logs = [];
    public string $stored = '';
    protected function ReadAttributeString(string $name): string { return $this->stored; }
    protected function WriteAttributeString(string $name, string $value): void { $this->stored = $value; }
    protected function ReadPropertyInteger(string $name): int { return 20; }
    protected function ReadPropertyString(string $name): string { return '#303030'; }
    protected function ReadPropertyBoolean(string $name): bool { return true; }
    protected function RegisterMessage(int $id, int $message): void { $this->messages[$id][$message] = $message; }
    protected function GetMessageList(): array { return array_map('array_values', $this->messages); }
    protected function UnregisterMessage(int $id, int $message): void { unset($this->messages[$id][$message]); }
    protected function UpdateVisualizationValue(string $value): void {}
    protected function ReloadForm(): void {}
    protected function SendDebug(string $name, string $value, int $format): void { $this->logs[] = $value; }
}
function IPS_ObjectExists(int $id): bool { return true; }
function IPS_GetObject(int $id): array { return ['ObjectType'=>2, 'ParentID'=>0]; }
function IPS_GetName(int $id): string { return 'Temperature'; }
function IPS_GetChildrenIDs(int $id): array { return []; }
function IPS_VariableExists(int $id): bool { return $id > 0; }
function IPS_GetVariable(int $id): array { return $GLOBALS['variables'][$id] ?? ['VariableType'=>2]; }
function GetValue(int $id): mixed { return $GLOBALS['value'] ?? 21.5; }
function GetValueFormatted(int $id): string { return $GLOBALS['formatted'] ?? '21.5 °C'; }
function IPS_GetVariablePresentation(int $id): array { return $GLOBALS['presentation'] ?? []; }
function IPS_VariableProfileExists(string $name): bool { return $name !== 'Missing'; }
function IPS_GetVariableProfile(string $name): array { return $GLOBALS['profile']; }
function IPS_InstanceExists(int $id): bool { return false; }
function SetValue(int $id, mixed $value): void { $GLOBALS['writes'][] = [$id,$value]; }
function RequestAction(int $id, mixed $value): void { $GLOBALS['actions'][] = [$id,$value]; }
require $argv[1] ?? dirname(__DIR__) . '/FLOOR/module.php';
function expect(bool $condition, string $description): void {
    if (!$condition) throw new RuntimeException('FAIL: ' . $description);
    echo 'PASS: ' . $description . "\n";
}
set_error_handler(function(int $code, string $message): bool { throw new ErrorException($message, 0, $code); });
$m = new Floorplan;
$invoke = fn(string $method, ...$args) => (new ReflectionMethod(Floorplan::class, $method))->invoke($m, ...$args);
$node = $invoke('BuildObjectTreeNode',123,'');
expect($node['valueText'] === '21.5 °C' && $m->logs === [], 'picker formats normal variable');
$GLOBALS['variables'][123] = ['VariableType'=>2, 'VariableCustomProfile'=>'Missing'];
expect($invoke('BuildObjectTreeNode',123,'')['valueText'] === '21.5', 'missing profile uses raw value');
$GLOBALS['variables'][123] = ['VariableType'=>2];
$GLOBALS['presentation'] = ['PRESENTATION'=>'test', 'DIGITS'=>2];
$GLOBALS['formatted'] = '21.5';
expect($invoke('BuildObjectTreeNode',123,'')['valueText'] === '21.50', 'picker respects presentation digits');
unset($GLOBALS['presentation']);
$GLOBALS['presentation'] = ['PRESENTATION'=>'legacy', 'PROFILE'=>'Missing'];
expect($invoke('BuildObjectTreeNode',123,'')['valueText'] === '21.5', 'missing presentation profile uses raw value');
unset($GLOBALS['presentation']);
foreach ([false, 7, 'CHARGING'] as $rawValue) {
    $GLOBALS['value'] = $rawValue;
    $GLOBALS['formatted'] = 'Formatted value';
    expect($invoke('BuildObjectTreeNode',123,'')['valueText'] === 'Formatted value', 'picker accepts scalar value: ' . json_encode($rawValue));
}
unset($GLOBALS['value']);
$project = '{"floors":[{"id":"floor_1","items":[{"id":"lamp","variableID":123,"colorVariableID":124}],"openings":[{"id":"window_1","variableID":125,"shutterVariableID":126}]}]}';
$m->SetFloorplanJSON($project);
expect(count(array_filter($m->messages)) === 4, 'direct setter subscribes all assigned variables');
$m->messages[123][999] = 999;
$m->RequestAction('save','{"floors":[{"id":"floor_1","items":[{"variableID":124}]}]}');
expect(!isset($m->messages[123][VM_UPDATE]) && isset($m->messages[123][999]) && isset($m->messages[124][VM_UPDATE]), 'editor save updates subscriptions and preserves other messages');
$m->RestoreFloorplanBackup(base64_encode($project));
expect(isset($m->messages[125][VM_UPDATE]), 'restore subscribes restored variables');
$m->ResetFloorplan();
expect(array_filter($m->messages) === [123=>[999=>999]], 'reset removes only variable subscriptions');
$m->SetFloorplanJSON($project);
$GLOBALS['writes'] = $GLOBALS['actions'] = [];
$invoke('OperateOpeningValue','floor_1','window_1','variableID',8.0);
expect($GLOBALS['writes'] === [] && $GLOBALS['actions'] === [], 'status variable is read-only');
$GLOBALS['variables'][125] = ['VariableType'=>2, 'VariableAction'=>456];
$invoke('OperateOpeningValue','floor_1','window_1','variableID',8.0);
expect($GLOBALS['actions'] === [[125,8.0]], 'assigned variable with action still operates');
$GLOBALS['variables'][125]['VariableCustomAction'] = 1;
$invoke('OperateOpeningValue','floor_1','window_1','variableID',9.0);
$invoke('OperateOpeningValue','floor_1','window_1','unassignedField',9.0);
expect(count($GLOBALS['actions']) === 1 && $GLOBALS['writes'] === [], 'disabled action and unassigned field cannot operate');
$valid = $invoke('DecodeAndValidateProject','{"floors":[{"id":"ground","walls":[{}],"items":[{"_value":99}]}]}');
expect($valid['activeFloor'] === 'ground' && !isset($valid['floors'][0]['items'][0]['_value']), 'valid backup normalizes and strips transient metadata');
expect(count($invoke('DecodeAndValidateProject','{}')['floors']) === 1, 'empty project receives default floor');
foreach (['[]','null','{"floors":{}}','{"floors":{"ground":{"id":"ground"}}}','{"floors":[null]}','{"floors":[{"items":{}}]}','{"floors":[{"walls":[1]}]}','{broken'] as $bad) {
    $stored = $m->stored;
    try {
        $m->SetFloorplanJSON($bad);
        throw new RuntimeException('Invalid project accepted');
    } catch (InvalidArgumentException $expected) {
        expect($m->stored === $stored, 'invalid import preserves saved project: ' . $bad);
    }
}
$GLOBALS['profile'] = [
    'MinValue'=>0, 'MaxValue'=>3680, 'StepSize'=>0, 'Prefix'=>'', 'Suffix'=>' W',
    'Associations'=>[
        ['Value'=>0, 'Name'=>'%.0f', 'Color'=>-1],
        ['Value'=>5, 'Name'=>'%.0f', 'Color'=>16711680]
    ]
];
foreach ([1, 2] as $variableType) {
    $GLOBALS['variables'][321] = ['VariableType'=>$variableType, 'VariableCustomProfile'=>'Watt_Verbrauch_rot'];
    foreach ([0, 1, 5] as $value) {
        $GLOBALS['value'] = $value;
        $GLOBALS['formatted'] = $value . ' W';
        $meta = $invoke('GetVariableRuntimeMeta',321);
        expect($meta['_valueText'] === $value . ' W', 'numeric association preserves formatted value: type ' . $variableType . ', value ' . $value);
    }
}
$GLOBALS['variables'][321] = ['VariableType'=>3, 'VariableCustomProfile'=>'Charging'];
$GLOBALS['profile']['Associations'] = [['Value'=>'CHARGING', 'Name'=>'Laden', 'Color'=>-1]];
$GLOBALS['value'] = 'CHARGING';
$GLOBALS['formatted'] = 'CHARGING';
expect($invoke('GetVariableRuntimeMeta',321)['_valueText'] === 'Laden', 'string association label remains supported');
