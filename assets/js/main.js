(function () {
  var THEME_KEY = 'renthub-theme';
  var SIDEBAR_KEY = 'renthub-sidebar-collapsed';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function syncThemeToggleLabel(btn) {
    if (!btn) return;
    btn.setAttribute('aria-label', getTheme() === 'dark' ? '切换到浅色模式' : '切换到深色模式');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
      });
    }

    var themeToggle = document.querySelector('.theme-toggle');
    syncThemeToggleLabel(themeToggle);
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
        syncThemeToggleLabel(themeToggle);
      });
    }

    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (localStorage.getItem(THEME_KEY)) return;
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        syncThemeToggleLabel(themeToggle);
      });
    } catch (err) {}

    window.addEventListener('storage', function (e) {
      if (e.key !== THEME_KEY || !e.newValue) return;
      if (e.newValue !== 'dark' && e.newValue !== 'light') return;
      document.documentElement.setAttribute('data-theme', e.newValue);
      syncThemeToggleLabel(themeToggle);
    });

    var docLayout = document.querySelector('.doc-layout');
    var edgeTab = document.querySelector('.sidebar-edge-tab');
    var sidebar = document.querySelector('.sidebar');

    function syncSidebarAria() {
      if (!docLayout) return;
      var collapsed = docLayout.classList.contains('sidebar-collapsed');
      if (edgeTab) {
        edgeTab.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        edgeTab.setAttribute('aria-label', collapsed ? '展开侧栏' : '收起侧栏');
      }
    }

    function applySidebarInert() {
      if (!sidebar || !docLayout) return;
      var collapsed = docLayout.classList.contains('sidebar-collapsed');
      var desktop = window.matchMedia('(min-width: 769px)').matches;
      var inertWhenCollapsed = collapsed && desktop;
      try {
        sidebar.inert = inertWhenCollapsed;
        sidebar.removeAttribute('aria-hidden');
      } catch (err) {
        if (inertWhenCollapsed) sidebar.setAttribute('aria-hidden', 'true');
        else sidebar.removeAttribute('aria-hidden');
      }
    }

    function setSidebarCollapsed(collapsed) {
      if (!docLayout) return;
      docLayout.classList.toggle('sidebar-collapsed', collapsed);
      try {
        if (collapsed) localStorage.setItem(SIDEBAR_KEY, '1');
        else localStorage.removeItem(SIDEBAR_KEY);
      } catch (err) {}
      syncSidebarAria();
      applySidebarInert();
    }

    if (docLayout) {
      try {
        if (localStorage.getItem(SIDEBAR_KEY) === '1') docLayout.classList.add('sidebar-collapsed');
        else docLayout.classList.remove('sidebar-collapsed');
      } catch (err) {}
      syncSidebarAria();
      applySidebarInert();
    }

    window.addEventListener('resize', applySidebarInert);

    if (edgeTab) {
      edgeTab.addEventListener('click', function () {
        var collapsed = docLayout && docLayout.classList.contains('sidebar-collapsed');
        setSidebarCollapsed(!collapsed);
      });
    }

    window.addEventListener('storage', function (e) {
      if (e.key !== SIDEBAR_KEY || !docLayout) return;
      if (e.newValue === '1') docLayout.classList.add('sidebar-collapsed');
      else docLayout.classList.remove('sidebar-collapsed');
      syncSidebarAria();
      applySidebarInert();
    });

    var sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
      });
    }

    document.addEventListener('click', function (e) {
      if (navLinks && !e.target.closest('.nav-toggle') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
      if (sidebar && !e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
        sidebar.classList.remove('open');
      }
    });
  });
})();
