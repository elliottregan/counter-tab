import { storage } from 'wxt/utils/storage';

const count = storage.defineItem<number>('local:count', { fallback: 0 });

const display = document.getElementById('count') as HTMLOutputElement;
const incBtn = document.getElementById('inc') as HTMLButtonElement;
const decBtn = document.getElementById('dec') as HTMLButtonElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;

async function render() {
  display.textContent = String(await count.getValue());
}

incBtn.addEventListener('click', async () => {
  await count.setValue((await count.getValue()) + 1);
  render();
});

decBtn.addEventListener('click', async () => {
  await count.setValue((await count.getValue()) - 1);
  render();
});

resetBtn.addEventListener('click', async () => {
  await count.setValue(0);
  render();
});

count.watch(() => render());
render();
