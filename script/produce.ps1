using namespace System;

Remove-Item -Path ".\dist\*" -Recurse -Force;

yarn run compile;

[String]$jsInsider = Get-Content -Path ".\dist\index.js" -Raw;
[String]$jsCode = $jsInsider.Replace('vscode-insiders', 'vscode');
[String]$jsCodium = $jsInsider.Replace('vscode-insiders', 'vscodium');

[String]$pathInsider = '.\dist\index-vscode-insiders.js';
[String]$pathCode = '.\dist\index-vscode.js';
[String]$pathCodium = '.\dist\index-vscodium.js';

New-Item -Path $pathInsider -ItemType File -Value $jsInsider;
New-Item -Path $pathCode -ItemType File -Value $jsCode;
New-Item -Path $pathCodium -ItemType File -Value $jsCodium;
