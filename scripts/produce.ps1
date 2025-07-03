using namespace System;
using namespace System.IO;
using namespace System.Collections.Generic;

[String]$DistPath = [Path]::GetFullPath([Path]::Combine($PSScriptRoot, '..', 'dist'));
Remove-Item -Path ([Path]::Combine($DistPath, '*')) -Recurse -Force -Exclude 'index.js';

# Dictionary<ReplaceKey, List<(FileName, ReplaceValue)>>
[Dictionary[String, List[ValueTuple[String, String]]]]$replaceMap = [Dictionary[String, List[ValueTuple[String, String]]]]::new();
[void]$replaceMap.Add('#vscode-insiders#', @(
        [ValueTuple]::Create('vscode-insiders', 'vscode-insiders'),
        [ValueTuple]::Create('vscode', 'vscode'),
        [ValueTuple]::Create('vscodium', 'vscodium')
    ));
[void]$replaceMap.Add('#enableRemoteBot#', @(
        [ValueTuple]::Create('', 'true'),
        [ValueTuple]::Create('local', 'false')
    ));

[List[List[ValueTuple[String, String, String]]]]$resultSet = @();
function Get-ReplaceCombinations {
    param (
        [Dictionary[String, List[ValueTuple[String, String]]]]$sourceData,
        [Int32]$keyIndex = 0,
        [List[ValueTuple[String, String, String]]]$resultTuple = @()
    )

    if ($keyIndex -ge $sourceData.Keys.Count) {
        [List[ValueTuple[String, String, String]]]$final = @();
        $resultTuple | ForEach-Object -Process { $final.Add($_) };

        [void]$resultSet.Add($final);
        return;
    }

    [String]$currentKey = ([Array]$sourceData.Keys)[$keyIndex];
    [List[ValueTuple[String, String]]]$currentValues = $sourceData[$currentKey];
    foreach ($item in $currentValues) {
        [List[ValueTuple[String, String, String]]]$newOne = @();
        $resultTuple | ForEach-Object -Process { $newOne.Add($_) };

        $newOne.Add([ValueTuple]::Create($currentKey, $item.Item1, $item.Item2));
        Get-ReplaceCombinations -sourceData $sourceData -keyIndex ($keyIndex + 1) -resultTuple $newOne;
    }
}

Get-ReplaceCombinations -sourceData $replaceMap;

[String]$basePath = [Path]::Combine($DistPath, 'index');
[String]$baseEnd = '.js';
[String]$sourceCode = Get-Content -Path '.\dist\index.js' -Raw;
foreach ($fileConfig in $resultSet) {
    [String]$filePath = $basePath;
    [String]$resultCode = $sourceCode;
    foreach ($item in $fileConfig) {
        if (-not [String]::IsNullOrEmpty($item.Item2)) {
            $filePath += '-' + $item.Item2;
        }
        $resultCode = $resultCode.Replace($item.Item1, $item.Item3);
    }
    $filePath += $baseEnd;
    New-Item -Path $filePath -ItemType File -Value $resultCode;
}
