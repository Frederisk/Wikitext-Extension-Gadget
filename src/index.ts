/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

jQuery((): void => {
  function getCodeLink(): string {

    interface IArg { 'key': string; 'value': string }

    function toUriArgs(args: IArg[]): string {
      return args.map((value: IArg) => `${value.key}=${value.value}`).join('&');
    }

    // get scheme, `vscode.env.uriScheme`
    const scheme: string | undefined = 'vscode-insiders'; // 'vscode-insiders', 'vscode', undefined
    // for codespace or code-server, you need invoke `await vscode.env.asExternalUri`
    const codespaceScheme: string | undefined = 'https://*.github.dev';
    const head: string = scheme ? `${scheme}://` : `${codespaceScheme}/`;

    const extensionID: string = 'rowewilsonfrederiskholme.wikitext';
    const actionPath: string = '/PullPage';

    const isRemoteBot = 'true';
    const protocol: string = window.location.protocol;
    const server: string = window.mw.config.get('wgServer');
    const scriptPath = window.mw.config.get('wgScriptPath');
    const apiPath: string = `${scriptPath}/api.php`;
    const title: string = window.mw.config.get('wgPageName');

    const args: IArg[] = [
      { 'key': 'RemoteBot', 'value': isRemoteBot },
      { 'key': 'TransferProtocol', 'value': protocol },
      { 'key': 'SiteHost', 'value': server },
      { 'key': 'APIPath', 'value': apiPath },
      { 'key': 'Title', 'value': title },
    ];

    return `${head}${extensionID}${actionPath}?${toUriArgs(args)}`;
  }

  const text: string = "Open in VSCode";
  const gadgetID: string = "wikitext-extension-gadget";

  if (!window.mw) {
    console.error(`${gadgetID}: window.mw is not accessible.`);
    return undefined;
  }

  const skinName: string = window.mw.config.get('skin');
  if (!skinName) {
    console.warn(`${gadgetID}: skin is undefined`);
    return undefined;
  }

  const anyButton: JQuery<HTMLElement> | undefined = [
    $('#ca-edit'),
    $('#ca-viewsource'),
    $('#ca-view')
  ].filter(value => value.length > 0).shift();

  if (anyButton === undefined) {
    console.warn(`${gadgetID}: No buttons for insertion.`);
    return undefined;
  }

  const link = $('<a>').attr('href', getCodeLink()).attr('title', 'Open this page in VSCode').text(text);
  const button = $('<li>').attr('id', 'vscode-wikitext-button');

  // console.log(skinName);
  if (skinName !== 'minerva') {
    // [[any, button(link)]]
    button.append(link);
    anyButton.after(button);
  }
  else {
    // for minerva skin (mobile)
    const span = $('<span>');
    span.addClass('page-actions-menu__list-item');
    link.addClass('mw-ui-icon mw-ui-icon-element mw-ui-icon-wikimedia-edit-base20 mw-ui-icon-with-label-desktop');
    button.css({ 'align-items': 'center', 'display': 'flex' });
    link.css('vertical-align', 'middle');
    // [[any],button(span(link))]
    span.append(link);
    button.append(span);
    anyButton.parent().after(button);
  }
});
