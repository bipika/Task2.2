let infoBtnEl = document.getElementById('info-button');
let infoEl = document.getElementById('account-info');
let uploadBtnEl = document.getElementById('upload-button');
let fileListEl = document.getElementById('file-list');


const writeInfo = vals => {
	Object.entries(vals).forEach(([key, val]) => {
		const line = document.createElement('div');
		line.textContent = `${key}: ${val}`;
		infoEl.appendChild(line);
	});
};

const updateFileList = () => {
	return window.httpJson('post', `${window.dbRpcUrl}/files/list_folder`, {
		headers: window.getDbApiBaseHeaders(),
		body: {path: ''},
	})
		.then(({entries}) => {
			fileListEl.innerHTML = '';

			const ul = document.createElement('ul');

			entries.forEach(file => {
				const li = document.createElement('li');
				li.textContent = file.name;
				ul.appendChild(li);
			});

			fileListEl.appendChild(ul);
		});
};


infoBtnEl.addEventListener('click', () => {
	window.httpJson('post', `${window.dbRpcUrl}/users/get_account`, {
		headers: window.getDbApiBaseHeaders(),
		body: {account_id: sessionStorage.getItem('dbAccountId')},
	})
		.catch(e => {
			alert(e.message);
			throw e
		})
		.then(({name, ...rest}) => {
			infoEl.removeAttribute('hidden');
			infoEl.innerHTML = '';

			writeInfo(rest);
			writeInfo(name);
		});
});

uploadBtnEl.addEventListener('change', e => {
	const file = e.target.files[0];

	window.http('post', `${window.dbContentUrl}/files/upload`, {
		headers: {
			...window.getDbApiBaseHeaders(),
			'content-type': 'application/octet-stream',
			'dropbox-api-arg': JSON.stringify({
				mode: 'add',
				path: `/${file.name}`,
			}),
		},
		body: file,
	})
		.then(() => updateFileList());
});


updateFileList();
