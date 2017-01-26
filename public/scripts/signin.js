const signin = document.getElementById('signin');
function handleSubmit(e) {
	e.preventDefault();
	let target = e.target;
	let name = target.querySelector('.form-name').value;
	let pass = target.querySelector('.form-pass').value;			
	
	var xhr = new XMLHttpRequest();

	var body = 'name=' + encodeURIComponent(name) +
	  '&password=' + encodeURIComponent(pass);

	xhr.open("POST", 'http://localhost:5555/api/signin', true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

	xhr.onreadystatechange = function() {
		if (this.readyState != 4) return;		
		const success = JSON.parse(this.responseText).success; 				
		if(success){
			alert('Thank you for registration');			
		} else {
			alert('Username has already been used');
		}				
	}
	xhr.send(body);
}
signin.addEventListener('submit', handleSubmit)