window.http = (method, url, opts = {}) => window.fetch(url, {...opts, method})
	.then(res => {
		if (res.ok) return Promise.resolve(res);
		const e = new Error(`Request failed: ${res.url}`);
		e.response = res;
		return Promise.reject(e);
	});

window.httpJson = (method, url, opts = {}) => window.http(method, url, {
	headers: {'content-type': 'application/json', ...(opts.headers || {})},
	...(opts.body !== undefined ? {body: JSON.stringify(opts.body)} : {}),
})
	.then(res => res.json());

const loc = window.location;
window.baseUrl = `${loc.protocol}//${loc.host}${loc.pathname.match(/\/[^\/]*/)[0]}`;

window.dbAuthUrl = 'https://www.dropbox.com/oauth2/authorize';
window.dbRpcUrl = 'https://api.dropboxapi.com/2';
window.dbContentUrl = 'https://content.dropboxapi.com/2';

window.dbClientId = '4eiat35enkuw2ot';

window.getDbApiBaseHeaders = () => ({authorization: `Bearer ${sessionStorage.getItem('dbToken')}`});

window.apiUrl = window.baseUrl;
window.authUrl = `${window.baseUrl}/auth.html`;
window.appUrl = `${window.baseUrl}/app.html`;
