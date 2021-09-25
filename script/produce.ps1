Remove-Item -Path ".\dist\*";

yarn run compile;

$jsInsider = Get-Content -Path ".\dist\index.js" -Raw;
$jsCode = $jsInsider.Replace("vscode-insiders", "vscode");
$jsCodium = $jsInsider.Replace("vscode-insiders", "vscodium");

$pathInsider = ".\dist\index-vscode-insiders.js";
$pathCode = ".\dist\index-vscode.js";
$pathCodium = ".\dist\index-vscodium.js";

New-Item -Path $pathInsider -ItemType File -Value $jsInsider;
New-Item -Path $pathCode -ItemType File -Value $jsCode;
New-Item -Path $pathCodium -ItemType File -Value $jsCodium;
