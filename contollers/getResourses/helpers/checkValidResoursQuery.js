module.exports = function (req) {
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