const UserModel = require('../../models/DBSchemas').User;

module.exports =  function(req, res) {
	UserModel.find({}, function(err, users) {
		if(err) throw err;
		res.json(users)
	})
}