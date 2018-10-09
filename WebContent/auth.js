const query = window.location.search;
const code = query.match(/code\=([^&]*)/)[1];

http('get', `${window.apiUrl}/Auth?code=${code}&app_url=${window.authUrl}`)
	.then(res => res.json())
	.catch(e => {
		alert(e.message);
		throw e;
	})
	.then(({access_token, account_id}) => {
		sessionStorage.setItem('dbToken', access_token);
		sessionStorage.setItem('dbAccountId', account_id);
		location.href = window.appUrl;
	});
