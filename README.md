# Wikitext-Extension-Gadget

[![GitHub: wikitext gadget](https://img.shields.io/badge/GitHub-wikitext_gadget-yellow)](https://github.com/Frederisk/Wikitext-Extension-Gadget)
[![Build status](https://ci.appveyor.com/api/projects/status/9p6v7x6pjxst743i?svg=true)](https://ci.appveyor.com/project/Frederisk/wikitext-extension-gadget)
[![GitHub Actions CodeQL](https://github.com/Frederisk/Wikitext-Extension-Gadget/actions/workflows/codeql-analysis.yml/badge.svg/)](https://github.com/Frederisk/Wikitext-Extension-Gadget/actions?query=workflow%3ACodeQL)
[![Twitter: @rwfholme](https://img.shields.io/badge/twitter-%40rwfholme-blue)](https://twitter.com/rwfholme)
[![Patreon Donate](https://img.shields.io/badge/donate-patreon-orange)](https://www.patreon.com/rwfholme)

A Mediawiki Gadget for Wikitext Extension based on MediaWiki. To allow users to directly open VSCode in the browser to edit wiki pages.
![Open VSCode in the browser to edit wiki pages](https://user-images.githubusercontent.com/29837738/127597149-5f44306a-a9ee-461a-8022-bd39f8ce3852.gif)

## Usage

### For ordinary users(such as WikiMedia Sister Project editors)

First make sure that your [VSCode](https://code.visualstudio.com/) has installed the [Wikitext Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=RoweWilsonFrederiskHolme.wikitext) v3.4.0 or upper. Then you only need to log in to your site, open the User Preferences, Appearance, and add a new line of code for Custom JavaScript:

- For VSCode user:

    ```js
    mw.loader.load("https://github.com/Frederisk/Wikitext-Extension-Gadget/releases/latest/download/index-vscode.js");
    ```

- For VSCode Insiders user:

    ```js
    mw.loader.load("https://github.com/Frederisk/Wikitext-Extension-Gadget/releases/latest/download/index-vscode-insiders.js");
    ```

### For users who have customized API path

You may need to download the release or clone the repository, adjust some variables in the source code and copy the generated code to your account's User Preferences, Appearance in your site. The gadget built in this way cannot get the newest update. It's recommended to watch this repository to keep the function up-to-date.

There are two variables you should notice:

- The `apiPath` should be consistent with the Entry point URLs: `api.php` in the website page Special:Version.

    ```ts
    APIPath: window.mw.util.wikiScript('api');
    ```

- The `scheme` should be filled in the VSCode release version you are using. `vscode` or `vscode-insiders`.

    ```ts
    const scheme: string | undefined = 'vscode-insiders';
    ```

### For codespace or code-server user

The gadget does not yet provide support for such editor.

## Development

### building

```bash
npm install -g yarn # install yarn
yarn # install node modules
yarn run compile # compile
```
