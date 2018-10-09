let linkEl = document.getElementById('login-link');

linkEl.href = `${window.dbAuthUrl}?response_type=code&redirect_uri=${window.authUrl}&client_id=${window.dbClientId}`;
