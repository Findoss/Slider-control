/**
 * @format
 */

const ModeEnum = {
  PRESENT: "present",
  present: "PRESENT",
  EDIT: "edit",
  edit: "EDIT",
};

const SelectorsGoogle = {
  TITLE_BAR: ".docs-titlebar-buttons",
};

const $titleBar = document.querySelector(SelectorsGoogle.TITLE_BAR);

(async () => {
  function init() {
    const $btnStart = document.createElement("button");
    $btnStart.textContent = "Start presentation";
    $btnStart.addEventListener("click", () => {
      location.href = location.href.replace(ModeEnum.EDIT, ModeEnum.PRESENT);
    });

    $titleBar.prepend($btnStart);
  }

  init();
})();
