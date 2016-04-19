"use strict";

module.exports = function(app) {
    app.get('/', function(req, res){
    	res.render('index');
    });

    app.get('/create_page', function(req, res){
        res.render('creat_page');
    });

    app.get('/edit_page', function(req, res){
        res.render('edit_page');
    });

    app.get('/view', function(req, res){
        res.render('view');
    });
};