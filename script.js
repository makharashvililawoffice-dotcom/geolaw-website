(function () {
  var tabButtons = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  var navToggle = document.querySelector('.nav-toggle');
  var tabsNav = document.querySelector('.tabs');

  function revealPanel(panel) {
    panel.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function activate(name) {
    tabButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === name);
    });
    panels.forEach(function (panel) {
      var isMatch = panel.id === name;
      panel.classList.toggle('active', isMatch);
      if (isMatch) revealPanel(panel);
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

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
