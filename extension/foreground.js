const $titlebar = document.querySelector('.docs-titlebar-buttons');

const $btnStart = document.createElement('button');
$btnStart.textContent = 'Start presentation';
$btnStart.classList.add('goog-inline-block');

$titlebar.prepend($btnStart);

$btnStart.addEventListener('click', e => {
  console.log(e);
});

setTimeout(() => {
  document.body.click();
}, 3000);
