var but = document.querySelector('#get-charts');
function showCharts(e){
	if(e.target.textContent === 'SHOW CHARTS'){
		e.target.textContent = 'HIDE CHARTS';
	} else {
		e.target.textContent = 'SHOW CHARTS';
	}
	e.preventDefault();
	var chartsArr = document.querySelectorAll('.chart-wrap');
	[...chartsArr].forEach(el => {
		el.classList.toggle('show');
	})
}
but.addEventListener('click', showCharts);