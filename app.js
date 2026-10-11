'use strict';
document.querySelectorAll('[data-filter]').forEach(button => {
 button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'All projects' && card.dataset.category !== button.dataset.filter; });
 });
});

// Progressive enhancement: all links and code are already in the HTML.
document.querySelectorAll('[data-copy]').forEach(button => {
 button.hidden = false;
 button.addEventListener('click', async () => {
  const target = document.getElementById(button.dataset.copy);
  const status = button.closest('.project-source').querySelector('[role="status"]');
  try {
   await navigator.clipboard.writeText(target.textContent);
   status.textContent = button.textContent.includes('clone')
    ? 'Clone command copied. Paste it into your terminal.'
    : 'Code copied to clipboard.';
  } catch {
   target.parentElement.focus();
   const range = document.createRange();
   range.selectNodeContents(target);
   const selection = window.getSelection();
   selection.removeAllRanges();
   selection.addRange(range);
   status.textContent = 'Text selected. Use your keyboard or device menu to copy.';
  }
 });
});
