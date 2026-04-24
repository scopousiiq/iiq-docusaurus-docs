import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const BUTTON_ID = 'iiq-clear-highlights-pill';

  const marksPresent = () => document.querySelector('main mark, .breadcrumbs mark') !== null;

  const clearHighlights = () => {
    document.querySelectorAll('mark').forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
    });
    hidePill();
  };

  const showPill = () => {
    if (document.getElementById(BUTTON_ID)) return;
    const btn = document.createElement('button');
    btn.id = BUTTON_ID;
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Clear search highlights');
    btn.innerHTML = 'Clear highlights <kbd>Esc</kbd>';
    btn.addEventListener('click', clearHighlights);
    document.body.appendChild(btn);
  };

  const hidePill = () => document.getElementById(BUTTON_ID)?.remove();

  const refreshPill = () => (marksPresent() ? showPill() : hidePill());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && marksPresent()) {
      e.preventDefault();
      clearHighlights();
    }
  });

  // Clicking any highlighted term dismisses all highlights.
  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest?.('mark')) clearHighlights();
  });

  const start = () => {
    refreshPill();
    new MutationObserver(refreshPill).observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
