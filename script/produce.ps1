Remove-Item -Path ".\dist\*";

yarn run compile;

$jsInsider = Get-Content -Path ".\dist\index.js";
$jsCode = $jsInsider.Replace("vscode-insiders", "vscode");
$jsCodium = $jsInsider.Replace("vscode-insiders", "vscodium");

$pathInsider = ".\dist\index-vscode-insiders.js";
$pathCode = ".\dist\index-vscode.js";
$pathCodium = ".\dist\index-vscodium.js";

New-Item -Path $pathInsider, $PathCode, $pathCodium -ItemType File -Force;

Set-Content -Path $pathInsider -Value $jsInsider
Set-Content -Path $pathCode -Value $jsCode
Set-Content -Path $pathCodium -Value $jsCodium
