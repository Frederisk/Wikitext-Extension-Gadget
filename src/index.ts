/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

jQuery((): void => {
  const pageName: String = window.mw.config.get('wgPageName');
  const skinName: String = window.mw.config.get('skin');
  if (!pageName || !skinName) {
    return undefined;
  }

  const editButton: JQuery<HTMLElement> = $('#ca-edit');
  if (editButton.length <= 0) {
    return undefined;
  }

  const link = $('<a>').attr('href', 'code://').text('Open in VSCode');
  const button = $('<li>').attr('id', 'vscode-wikitext-button');

  if (skinName !== 'minerva') {
    button.append(link);

    editButton.parent().after(button);
  }
  else {
    const span = $('<span>');
    span.addClass('page-actions-menu__list-item');
    link.addClass('mw-ui-icon mw-ui-icon-element mw-ui-icon-wikimedia-edit-base20 mw-ui-icon-with-label-desktop');

    button.css({ 'align-items': 'center', 'display': 'flex' });
    link.css('vertical-align', 'middle');

    span.append(link);
    button.append(span);

    editButton.parent().after(button);
  }
});
