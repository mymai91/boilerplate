'use strict';

exports.show = function(req, res) {
	var id = req.params.id;

	res.send({thing: id});
}