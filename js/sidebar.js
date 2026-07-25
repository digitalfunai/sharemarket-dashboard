document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const toggleButtons = [...document.querySelectorAll('[data-sidebar-toggle]')]
    .filter((element) => !element.classList.contains('sidebar-backdrop'));

  if (!sidebar) return;

  const mobileQuery = window.matchMedia('(max-width: 991.98px)');
  const isMobile = () => mobileQuery.matches;

  sidebar.id ||= 'finoraSidebar';

  const syncToggleState = (mobileOpen = sidebar.classList.contains('mobile-open')) => {
    toggleButtons.forEach((button) => {
      button.setAttribute('aria-controls', sidebar.id);
      button.setAttribute('aria-expanded', String(isMobile() ? mobileOpen : !document.body.classList.contains('sidebar-collapsed')));
    });
  };

  const closeMobileSidebar = () => {
    sidebar.classList.remove('mobile-open');
    document.body.classList.remove('sidebar-open');
    backdrop?.classList.remove('show');
    syncToggleState(false);
  };

  const openMobileSidebar = () => {
    sidebar.classList.add('mobile-open');
    document.body.classList.add('sidebar-open');
    backdrop?.classList.add('show');
    syncToggleState(true);
  };

  const toggleSidebar = () => {
    if (isMobile()) {
      sidebar.classList.contains('mobile-open') ? closeMobileSidebar() : openMobileSidebar();
      return;
    }

    document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(
      'finoraSidebarCollapsed',
      String(document.body.classList.contains('sidebar-collapsed'))
    );
    syncToggleState(false);
  };

  if (!isMobile() && localStorage.getItem('finoraSidebarCollapsed') === 'true') {
    document.body.classList.add('sidebar-collapsed');
  }

  toggleButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSidebar();
    });
  });

  backdrop?.addEventListener('click', (event) => {
    event.preventDefault();
    closeMobileSidebar();
  });

  document.addEventListener('click', (event) => {
    if (!isMobile() || !sidebar.classList.contains('mobile-open')) return;
    if (sidebar.contains(event.target)) return;
    if (toggleButtons.some((button) => button.contains(event.target))) return;
    closeMobileSidebar();
  });

  sidebar.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobile()) closeMobileSidebar();
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      auth.logout();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobile()) closeMobileSidebar();
  });

  mobileQuery.addEventListener('change', () => {
    closeMobileSidebar();
    if (!isMobile() && localStorage.getItem('finoraSidebarCollapsed') === 'true') {
      document.body.classList.add('sidebar-collapsed');
    }
    syncToggleState(false);
  });

  syncToggleState(false);
});
