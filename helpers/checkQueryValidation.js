module.exports.checkValidDateQuery = function (req) {
	if(!req.query.y || !req.query.m || !req.query.d){		
		return false;
	}
	if(req.params.date !== 'date'){		
		return false;
	}
	if(+req.query.y < 2016 || +req.query.y > 2017 || isNaN(req.query.y)) {		
		return false;
	}
	if(+req.query.m < 0 || +req.query.m > 12 || isNaN(req.query.m)) {		
		return false;
	}
	if(+req.query.d < 1 || +req.query.d > 31 || isNaN(req.query.d)) {		
		return false;
	}

	return true;
}

module.exports.checkValidResoursQuery = function (req) {
	const resours = req.params.resours;	
	if(resours === 'privat'){
		return true;
	} else if(resours === 'finance') {
		return true;
	} else if(resours === 'kurs') {
		return true;
	}
	return false;
}