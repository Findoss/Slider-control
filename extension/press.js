/**
 * @format
 */

function keydown (k) {
  const oEvent = document.createEvent("KeyboardEvent");
  
  // Chromium Hack
  Object.defineProperty(oEvent, "keyCode", ({
    get: function () {
      return this.keyCodeVal;
    },
  }));

  Object.defineProperty(oEvent, "which", {
    get: function () {
      return this.keyCodeVal;
    },
  });

  // prettier-ignore
  oEvent.initKeyboardEvent("keydown",true,true,document.defaultView,k,k,"","",false,"");

  oEvent.keyCodeVal = k;
  document.body.dispatchEvent(oEvent);
}

keydown(document.querySelector('script[data-id="press-key"]').dataset.key);


