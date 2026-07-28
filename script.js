(function () {
  var tabButtons = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  var navToggle = document.querySelector('.nav-toggle');
  var tabsNav = document.querySelector('.tabs');

  function activate(name) {
    tabButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === name);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle('active', panel.id === name);
    });
    tabsNav.classList.remove('open');
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activate(btn.getAttribute('data-tab'));
      history.replaceState(null, '', '#' + btn.getAttribute('data-tab'));
    });
  });

  document.querySelectorAll('[data-tab-link]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      activate(link.getAttribute('data-tab-link'));
    });
  });

  navToggle.addEventListener('click', function () {
    tabsNav.classList.toggle('open');
  });

  var initial = window.location.hash.replace('#', '');
  if (initial && document.getElementById(initial)) {
    activate(initial);
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
