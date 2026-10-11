'use strict';
document.querySelectorAll('[data-filter]').forEach(button => {
 button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'All projects' && card.dataset.category !== button.dataset.filter; });
 });
});

// Repository tools and code samples; all editable content is treated as text.
document.querySelectorAll('[data-project-source]').forEach(host => {
 const content = window.projectContent?.[host.dataset.projectSource];
 if (!content) return;
 const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
 };
 const status = element('p', 'copy-status');
 status.setAttribute('role', 'status');
 status.setAttribute('aria-live', 'polite');
 const copyButton = (label, value, target) => {
  const button = element('button', 'copy-button', label);
  button.type = 'button';
  button.addEventListener('click', async () => {
   try {
    await navigator.clipboard.writeText(value);
    status.textContent = label === 'Copy git clone' ? 'Clone command copied. Paste it into your terminal to clone the repository.' : 'Code copied to clipboard.';
   } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
    target.focus();
    status.textContent = 'Clipboard access is unavailable. The text is selected; copy it using your keyboard or device menu.';
   }
  });
  return button;
 };
 let repo = null;
 const raw = (content.repoUrl || '').trim().replace(/\/$/, '');
 // Accept canonical HTTPS GitHub repository URLs, avoiding executable URLs.
 if (/^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(raw)) repo = raw.replace(/\.git$/, '');
 const source = element('div', 'source-panel');
 source.append(element('div', 'eyebrow', 'EXPLORE THE SOURCE'), element('h2', '', 'Inside the allocator'));
 if (repo) {
  const actions = element('div', 'source-actions');
  const link = element('a', 'repo-button', 'View repository ↗');
  link.href = repo;
  const command = `git clone ${repo}.git`;
  const pre = element('pre', 'clone-command');
  pre.tabIndex = 0;
  pre.setAttribute('aria-label', 'Git clone command');
  pre.append(element('code', '', command));
  actions.append(link, copyButton('Copy git clone', command, pre));
  source.append(actions, pre);
 } else {
  source.append(element('p', 'source-pending', 'Source repository coming soon.'));
 }
 host.append(source);
 if (content.code) {
  host.append(element('h2', '', content.codeTitle || 'Code example'));
  if (content.codeDescription) host.append(element('p', 'code-description', content.codeDescription));
  const frame = element('div', 'code-frame');
  const bar = element('div', 'code-toolbar');
  const meta = element('div', 'code-meta');
  meta.append(element('span', '', content.filename || 'Example'), element('span', 'code-language', content.language || 'Code'));
  const pre = element('pre', 'code-content');
  pre.tabIndex = 0;
  pre.setAttribute('aria-label', content.codeTitle || 'Code example');
  pre.append(element('code', '', content.code));
  bar.append(meta, copyButton('Copy code', content.code, pre));
  frame.append(bar, pre);
  host.append(frame);
 }
 host.append(status);
});
