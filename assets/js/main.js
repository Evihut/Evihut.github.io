/* Minimal behaviour: theme preference + copyright year.
   No animation, no tracking, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'theme';

  // Restore a previously chosen theme. Absent a choice, the CSS
  // prefers-color-scheme block decides.
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* private mode, blocked storage — fall back to system */ }

  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
