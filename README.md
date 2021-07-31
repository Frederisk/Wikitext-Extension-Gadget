# Wikitext-Extension-Gadget

A Mediawiki Gadget for Wikitext Extension

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
    const apiPath: string = `${scriptPath}/api.php`;
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
