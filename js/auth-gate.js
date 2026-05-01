(function () {
  var AUTH_KEY = 'lbo_auth_v1';

  function currentPage() {
    var segments = location.pathname.split('/').filter(Boolean);
    var last = segments.length ? segments[segments.length - 1] : '';
    return last.indexOf('.') !== -1 ? last : 'index.html';
  }

  function nav(url) {
    location.replace(new URL(url, location.href).href);
  }

  var page = currentPage();

  if (page === 'login.html') {
    try {
      if (sessionStorage.getItem(AUTH_KEY) === '1') {
        nav('index.html');
      }
    } catch (e) {}
    return;
  }

  try {
    if (sessionStorage.getItem(AUTH_KEY) !== '1') {
      nav('login.html');
    }
  } catch (e) {
    nav('login.html');
  }
})();
