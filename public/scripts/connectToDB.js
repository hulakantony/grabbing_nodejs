	function curReload() {
		getDbData()
		setInterval(getDbData, 3600000);
	}	

	function getDbData(){		
		let finance = {
				buy: [],
				sale: [],
				nbu: []
			},
			privat = {
				buy: [],
				sale: [],
				nbu: []
			},
			kurs = {
				buy: [],
				sale: [],
				nbu: []
			},
			lastUpdated = '';

		function sortDB(arr) {
			arr.forEach((el, i, array) => {
				if(el.grabbed_from === 'finance.i.ua'){
					finance.buy.push(el.purchase);
					finance.sale.push(el.sale);
					finance.nbu.push(el.nbu_cur);					
				}
				if(el.grabbed_from === 'privatbank.ua') {
					privat.buy.push(el.purchase);
					privat.sale.push(el.sale);
					privat.nbu.push(el.nbu_cur);
				}
				if(el.grabbed_from === 'kurs.com.ua') {
					kurs.buy.push(el.purchase);
					kurs.sale.push(el.sale);
					kurs.nbu.push(el.nbu_cur);
				}				
			})
			lastUpdated = arr[arr.length-1].created_at;
		}			
		const token = localStorage.getItem('auth_token');
		if(!token){
			document.body.innerHTML = '<h1>You are not authorized</h1><a href="/">Get Back</a>';
			return;
		} else {
			fetch('http://localhost:5555/api', {
				method: 'GET',
				headers: {
					'x-access-token' : token
				}
			})
				.then(data => data.json())
				.then(data => {					
					sortDB(data);				
					financeToChart(finance, 'finance.i.ua', '1');
					financeToChart(privat, 'privat', '2');
					financeToChart(kurs, 'kurs.com.ua', '3');
					currToTable(finance, privat, kurs);				
					document.getElementById('last-updated').innerHTML = new Date(lastUpdated).toLocaleTimeString()
				})			
				.catch(() => {console.log('Data not recieved')})
		}		
		

	}
	function currToTable(finance, privat, kurs){		
		let financeTr = document.querySelector('.finance-res');		
		let privatTr = document.querySelector('.privat-res');	
		let kursTr = document.querySelector('.kurs-res');	

		financeTr.querySelector('.buy-td').innerHTML = finance.buy[finance.buy.length - 1];
		financeTr.querySelector('.sale-td').innerHTML = finance.sale[finance.sale.length - 1];
		financeTr.querySelector('.nbu-td').innerHTML = finance.nbu[finance.nbu.length - 1];

		privatTr.querySelector('.buy-td').innerHTML = privat.buy[privat.buy.length - 1];
		privatTr.querySelector('.sale-td').innerHTML = privat.sale[privat.sale.length - 1];
		privatTr.querySelector('.nbu-td').innerHTML = privat.nbu[privat.nbu.length - 1];

		kursTr.querySelector('.buy-td').innerHTML = kurs.buy[kurs.buy.length - 1];
		kursTr.querySelector('.sale-td').innerHTML = kurs.sale[kurs.sale.length - 1];
		kursTr.querySelector('.nbu-td').innerHTML = kurs.nbu[kurs.nbu.length - 1];		
	}

	function financeToChart(obj, label, chartId) {
		var data = { 
		  labels: [`${label}`],		 
		  series: [
		    obj.buy,
		    obj.sale,
		    label !== 'privat' ? obj.nbu : []
		  ]
		};

		var options = {
			width: 400,
			height: 350,
			showPoint: false,
			axisX: {			    
			    showGrid: false,			  
			    showLabel: true
  			},
  			axisY: {
  				labelInterpolationFnc: function(value) {
      			return '$' + value;
    			}
  			}
		};		
		new Chartist.Line(`#chart${chartId}`, data, options); 
	}

	document.addEventListener('DOMContentLoaded', curReload);