/**
 * @format
 */

const ModeEnum = {
  PRESENT: 'present',
  present: 'PRESENT',
  EDIT: 'edit',
  edit: 'EDIT'
};

const SelectorsGoogle = {
  TITLE_BAR: '.docs-titlebar-buttons'
};

(async () => {
  function init() {
    const $titleBar = document.querySelector(SelectorsGoogle.TITLE_BAR);

    const $btnStart = document.createElement('button');
    $btnStart.textContent = 'Start presentation';
    $btnStart.addEventListener('click', () => {
      location.href = location.href.replace(ModeEnum.EDIT, ModeEnum.PRESENT);
    });

    $titleBar.prepend($btnStart);
  }

  init();
})();
