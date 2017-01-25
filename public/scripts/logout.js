const logout = document.getElementById('logout');
function handleLogout () {
	localStorage.removeItem('auth_token');
	window.location.href = `http://localhost:8080/`;
}
logout.addEventListener('click', handleLogout)