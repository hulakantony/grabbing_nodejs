const logout = document.getElementById('logout');
function handleLogout () {
	localStorage.removeItem('auth_token');
	window.location.href = `http://localhost:5555/`;
}
logout.addEventListener('click', handleLogout)