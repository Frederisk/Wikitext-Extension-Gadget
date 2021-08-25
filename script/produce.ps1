Remove-Item -Path ".\dist\*";

yarn run compile;

$jsInsider = Get-Content -Path ".\dist\index.js";
$jsCode = $jsInsider.Replace("vscode-insiders", "vscode");

$pathInsider = ".\dist\index-vscode-insiders.js";
$pathCode = ".\dist\index-vscode.js";

New-Item -Path $pathInsider, $PathCode -ItemType File -Force;

Set-Content -Path $pathInsider -Value $jsInsider
Set-Content -Path $pathCode -Value $jsCode
