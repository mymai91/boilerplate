(function () {

'use strict';

exports.show = function(req, res) {
	var id = req.params.id;

	res.send({thing: id});
};

exports.showSecured = function(req, res) {
	var id = req.params.id;

	res.send({thing: 'user: ' + req.user.email + ' secured: '+id});
};

}());
