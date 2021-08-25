/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
jQuery.when(window.mw.loader.using('mediawiki.util'), $.ready).then((): void => {
  function getCodeLink(): string {
    // get scheme, `vscode.env.uriScheme`
    const scheme: string | undefined = 'vscode-insiders'; // 'vscode-insiders', 'vscode', undefined
    // for codespace or code-server, you need invoke `await vscode.env.asExternalUri`
    const codespaceScheme: string | undefined = 'https://*.github.dev';
    const head: string = scheme ? `${scheme}://` : `${codespaceScheme}/`;

    const extensionID = 'rowewilsonfrederiskholme.wikitext';
    const actionPath = '/PullPage';

    const args: Record<string, string> = {
      RemoteBot: 'true',
      TransferProtocol: window.location.protocol,
      SiteHost: window.mw.config.get('wgServer'),
      APIPath: window.mw.util.wikiScript('api'),
      Title: window.mw.config.get('wgPageName')
    };

    return `${head}${extensionID}${actionPath}?${new URLSearchParams(args).toString()}`;
  }

  const text = "Open in VSCode";
  const gadgetID = "wikitext-extension-gadget";
  const tooltip = "Open this page in VSCode";

  const skinName: string = window.mw.config.get('skin');

  window.mw.util.addPortletLink(
    skinName === "minerva" ? 'p-tb' : 'p-views',
    getCodeLink(),
    text,
    gadgetID,
    tooltip,
    undefined,
    '#ca-history');
});
