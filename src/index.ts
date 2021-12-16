/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

type DisplayInfo = { text: string; tooltip: string };

/* eslint-disable @typescript-eslint/naming-convention */
jQuery.when(window.mw.loader.using('mediawiki.util'), $.ready).then((): void => {
  // check is editable or its source can be viewed
  if (!(window.mw.config.get("wgIsProbablyEditable") || ($('#ca-viewsource').length > 0))) {
    // if not, do nothing
    return undefined;
  }

  // i18n
  const i18nSource: Record<string, DisplayInfo> = {
    english: {
      text: 'Open in VSCode',
      tooltip: 'Open this page in Visual Studio Code',
    },
    russian: {
      text: 'Открыть в VSCode',
      tooltip: 'Открыть эту страницу в Visual Studio Code',
    },
    japanese: {
      text: 'VSCode で開く',
      tooltip: 'このページを Visual Studio Code で開く',
    },
    cantonese: {
      text: '開啟於 VSCode',
      tooltip: '開啟此頁於 Visual Studio Code',
    },
    simplified_chinese: {
      text: '在 VSCode 中打开',
      tooltip: '在 Visual Studio Code 中打开此页',
    },
    traditional_chinese: {
      text: '在 VSCode 中打開',
      tooltip: '在 Visual Studio Code 中打開此頁',
    },
    korean: {
      text: 'VSCode 에서 열기',
      tooltip: '이 페이지를 Visual Studio Code 에서 열기',
    },
  };
  const i18n: Record<string, DisplayInfo> = {
    // English: default
    'en': i18nSource['english'],
    'ru': i18nSource['russian'],
    'ja': i18nSource['japanese'],
    'ko': i18nSource['korean'],
    'yue': i18nSource['cantonese'],
    'zh-yue': i18nSource['cantonese'],
    'zh': i18nSource['traditional_chinese'],
    'zh-hans': i18nSource['simplified_chinese'],
    'zh-cn': i18nSource['simplified_chinese'],
    'zh-sg': i18nSource['simplified_chinese'],
    'zh-my': i18nSource['simplified_chinese'],
    'zh-hant': i18nSource['traditional_chinese'],
    'zh-tw': i18nSource['traditional_chinese'],
    'zh-hk': i18nSource['traditional_chinese'],
    'zh-mo': i18nSource['traditional_chinese'],
  };
  const lang: string = window.mw.config.get('wgUserLanguage');
  const displayInfo: DisplayInfo = {
    ...i18nSource['english'], // default language
    ...i18n[lang.split('-')[0]], // language without region
    ...i18n[lang] // exact language
  };

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
    displayInfo['text'],
    'wikitext-extension-gadget',
    displayInfo['tooltip'],
    undefined,
    isMinerva ? undefined : '#ca-history');
});
