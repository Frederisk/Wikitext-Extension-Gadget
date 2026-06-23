using namespace System;
using namespace System.Collections;
using namespace System.Collections.Generic;
using namespace System.IO;

$ErrorActionPreference = 'Stop';
[String]$userName = $env:MW_USERNAME;
[String]$password = $env:MW_PASSWORD;
[String]$tag = $env:GITHUB_REF_NAME;
[String]$apiUrl = 'https://meta.wikimedia.org/w/api.php';

Write-Host -Message 'Requesting login token from Meta-Wiki...';
[HashTable]$tokenParams = @{
    action = 'query'
    meta   = 'tokens'
    type   = 'login'
    format = 'json'
};
$resToken = Invoke-RestMethod -Uri $apiUrl -Method Get -Body $tokenParams -SessionVariable 'mwSession';
[String]$loginToken = $resToken.query.tokens.logintoken;

if ([String]::IsNullOrEmpty($loginToken)) {
    Write-Error -Message 'Failed to retrieve login token from Meta-Wiki.';
    exit 1;
}

Write-Host "Logging in as $userName..."
[HashTable]$loginParams = @{
    action     = 'login';
    lgname     = $userName;
    lgpassword = $password;
    lgtoken    = $loginToken;
    format     = 'json';
};

$resLogin = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $loginParams -WebSession $mwSession;
if ($resLogin.login.result -ne 'Success') {
    Write-Error -Message "Login failed: $($resLogin.login.result)";
    exit 1;
}

Write-Host 'Requesting CSRF token...'
[HashTable]$csrfParams = @{
    action = 'query'
    meta   = 'tokens'
    type   = 'csrf'
    format = 'json'
};
$resCsrf = Invoke-RestMethod -Uri $apiUrl -Method Get -Body $csrfParams -WebSession $mwSession;
[String]$csrfToken = $resCsrf.query.tokens.csrftoken;

if ([String]::IsNullOrEmpty($csrfToken) -or $csrfToken -eq '+\') {
    Write-Error -Message 'Failed to retrieve CSRF token from Meta-Wiki.';
    exit 1;
}

[FileInfo[]]$outputFiles = Get-ChildItem './dist/index-*.js' -File;

if ($outputFiles.Count -eq 0) {
    Write-Error -Message 'No output files found in ./dist directory.';
    exit 1;
}

foreach ($file in $outputFiles) {
    [String]$fileName = $file.Name;
    [String]$targetPage = "User:Rowe_Wilson_Frederisk_Holme/Wikitext-Extension-Gadget/$fileName";
    [String]$scriptContent = Get-Content -Path $file.FullName -Raw;

    Write-Host "Deploying $fileName to Meta-Wiki page: $targetPage ...";
    [HashTable]$editParams = @{
        action  = 'edit';
        title   = $targetPage;
        text    = $scriptContent;
        token   = $csrfToken;
        format  = 'json';
        bot     = 'true';
        summary = "Deploy $fileName from GitHub Actions (Tag: $tag, Commit: $env:GITHUB_SHA)";
    };

    $resEdit = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $editParams -WebSession $mwSession;

    if ($resEdit.edit.result -eq 'Success') {
        Write-Host "Successfully published $fileName to $targetPage! New Rev ID: $($resEdit.edit.newrevid)";
    }
    else {
        Write-Warning "Failed to publish ${fileName}: $($resEdit | ConvertTo-Json -Depth 5)";
    }
}
