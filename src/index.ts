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
      tooltip: '喺 Visual Studio Code 開呢個頁面',
    },
    simplified_chinese: {
      text: '在 VSCode 中打开',
      tooltip: '在 Visual Studio Code 中打开此页面',
    },
    traditional_chinese: {
      text: '使用 VSCode 開啟',
      tooltip: '以 Visual Studio Code 開啟此頁面',
    },
    korean: {
      text: 'VSCode 에서 열기',
      tooltip: '이 페이지를 Visual Studio Code 에서 열기',
    },
    thai: {
      text: 'เปิดใน VSCode',
      tooltip: 'เปิดหน้านี้ใน Visual Studio Code',
    },
    vietnamese: {
      text: 'Mở trong VSCode',
      tooltip: 'Mở trang này trong Visual Studio Code',
    },
    indonesian: {
      text: 'Buka di VSCode',
      tooltip: 'Buka halaman ini di Visual Studio Code',
    },
    polish: {
      text: 'Otwórz w VSCode',
      tooltip: 'Otwórz tę stronę w Visual Studio Code',
    },
    dutch: {
      text: 'Open in VSCode',
      tooltip: 'Open deze pagina in Visual Studio Code',
    },
    french: {
      text: 'Ouvrir dans VSCode',
      tooltip: 'Ouvrir cette page dans Visual Studio Code',
    },
    german: {
      text: 'Öffnen in VSCode',
      tooltip: 'Öffne diese Seite in Visual Studio Code',
    },
  };
  const i18n: Record<string, DisplayInfo> = {
    'en': i18nSource['english'],
    'ru': i18nSource['russian'],
    'ja': i18nSource['japanese'],
    'ko': i18nSource['korean'],
    'yue': i18nSource['cantonese'],
    'zh-yue': i18nSource['cantonese'],
    'zh': i18nSource['simplified_chinese'],
    'zh-hans': i18nSource['simplified_chinese'],
    'zh-cn': i18nSource['simplified_chinese'],
    'zh-sg': i18nSource['simplified_chinese'],
    'zh-my': i18nSource['simplified_chinese'],
    'zh-hant': i18nSource['traditional_chinese'],
    'zh-tw': i18nSource['traditional_chinese'],
    'zh-hk': i18nSource['traditional_chinese'],
    'zh-mo': i18nSource['traditional_chinese'],
    'th': i18nSource['thai'],
    'vi': i18nSource['vietnamese'],
    'id': i18nSource['indonesian'],
    'pl': i18nSource['polish'],
    'nl': i18nSource['dutch'],
    'fr': i18nSource['french'],
    'de': i18nSource['german'],
  };
  const lang: string = window.mw.config.get('wgUserLanguage');
  const displayInfo: DisplayInfo = {
    ...i18nSource['english'], // default language
    ...i18n[lang.split('-')[0]], // language without region
    ...i18n[lang] // exact language
  };

  // get scheme, `vscode.env.uriScheme`
  const scheme = '#vscode-insiders#'; // 'vscode-insiders', 'vscode', undefined
  // for codespace or code-server, you need invoke `await vscode.env.asExternalUri`
  // const codespaceScheme = 'https://*.github.dev';
  // const head: string = scheme ? `${scheme}://` : `${codespaceScheme}/`;

  const extensionID = 'rowewilsonfrederiskholme.wikitext';
  const actionPath = '/PullPage';
  const args: Record<string, string> = {
    // Except for extreme value (such as `'false'`, `''`, `undefined`), all other values will be treated as `true`.
    // If `true` vscode will use the web page config to create a temporary remote bot.
    // For private wikis, you can set `RemoteBot` to `false` to use the vscode local bot.
    RemoteBot: '#enableRemoteBot#',
    TransferProtocol: window.location.protocol,
    // 'https://host' => '//host': https://www.mediawiki.org/wiki/Manual:$wgServer
    SiteHost: window.mw.config.get('wgServer').replace(/^[\w-]*?:(?=\/\/)/, ''),
    APIPath: window.mw.util.wikiScript('api'),
    Title: window.mw.config.get('wgPageName')
  };

  const skinMapping: Record<string, { portletId: string; nextNode: string | undefined } | undefined> = {
    'minerva': { portletId: 'p-tb', nextNode: '#ca-history' },
    'monobook': { portletId: 'p-cactions', nextNode: '#ca-history' },
  };
  const skinName: string = window.mw.config.get('skin');
  window.mw.util.addPortletLink(
    skinMapping[skinName]?.portletId || 'p-views',
    `${scheme}://${extensionID}${actionPath}?${new URLSearchParams(args).toString()}`,
    displayInfo['text'],
    'wikitext-extension-gadget',
    displayInfo['tooltip'],
    undefined,
    skinMapping[skinName]?.nextNode
  );
});
