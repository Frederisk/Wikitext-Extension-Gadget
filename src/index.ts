/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
jQuery.when(window.mw.loader.using('mediawiki.util'), $.ready).then((): void => {
  if (!(mw.config.get("wgIsProbablyEditable") || ($('#ca-viewsource').length > 0))) {
    return undefined;
  }

  const text = 'Open in VSCode';
  const gadgetID = 'wikitext-extension-gadget';
  const tooltip = 'Open this page in VSCode';
  // get scheme, `vscode.env.uriScheme`
  const scheme = 'vscode-insiders'; // 'vscode-insiders', 'vscode', undefined
  // for codespace or code-server, you need invoke `await vscode.env.asExternalUri`
  // const codespaceScheme = 'https://*.github.dev';
  // const head: string = scheme ? `${scheme}://` : `${codespaceScheme}/`;
  const extensionID = 'rowewilsonfrederiskholme.wikitext';
  const actionPath = '/PullPage';
  const args: Record<string, string> = {
    RemoteBot: 'true',
    TransferProtocol: window.location.protocol,
    // 'https://host' => '//host': https://www.mediawiki.org/wiki/Manual:$wgServer
    SiteHost: window.mw.config.get('wgServer').replace(/^[\w-]*?:(?=\/\/)/, ''),
    APIPath: window.mw.util.wikiScript('api'),
    Title: window.mw.config.get('wgPageName')
  };

  const isMinerva: boolean = window.mw.config.get('skin') === 'minerva';

  window.mw.util.addPortletLink(
    isMinerva ? 'p-tb' : 'p-views',
    `${scheme}://${extensionID}${actionPath}?${new URLSearchParams(args).toString()}`,
    text,
    gadgetID,
    tooltip,
    undefined,
    isMinerva ? undefined : '#ca-history');
});
