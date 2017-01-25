const login = document.getElementById('login');
function handleLogin(e){
	e.preventDefault();	
	let form = e.target.parentElement;
	let name = form.querySelector('.form-name').value;
	let pass = form.querySelector('.form-pass').value;			
	
	var xhr = new XMLHttpRequest();

	var body = 'name=' + encodeURIComponent(name) +
	  '&password=' + encodeURIComponent(pass);

	xhr.open("POST", 'http://localhost:5555/api/authenticate', true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

	xhr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		const token = JSON.parse(this.responseText).token;	
		const success = JSON.parse(this.responseText).success; 				
		if(success){
			localStorage.setItem('auth_token', token);
			window.location.href = `http://localhost:5555/currency`;
		} else {
			alert('Wrong login or password');
		}				
	}
	xhr.send(body);
}		
login.addEventListener('click', handleLogin)