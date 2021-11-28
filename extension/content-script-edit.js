(async () => {
  const ModeEnum = {
    PRESENT: 'present',
    present: 'PRESENT',
    EDIT: 'edit',
    edit: 'EDIT'
  };

  const SelectorsGoogle = {
    TITLEBAR: '.docs-titlebar-buttons'
  };

  function EditPage() {
    const $titlebar = document.querySelector(SelectorsGoogle.TITLEBAR);

    const $btnStart = document.createElement('button');
    $btnStart.textContent = 'Start presentation';
    $btnStart.addEventListener('click', () => {
      location.href = location.href.replace(ModeEnum.EDIT, ModeEnum.PRESENT);
    });

    $titlebar.prepend($btnStart);
  }

  EditPage();
})();
