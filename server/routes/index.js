const { Router } = require('express');
const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

let passport = require('passport');


//helper function for guard purposes
function requireAuth(req, res, next) {
    //check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/secure');
    }
    next();
}




route.get('/', services.homePage);



route.get('/home', services.homePage);

route.get('/contact', services.contact);

route.get('/about', services.about);

route.get('/services', services.services);

route.get('/projects', services.projects);

/*route.get('/secure/list-users', requireAuth, services.usersList);

route.get('/secure/update-user', requireAuth, services.updateUser);*/




//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


//Users api
//for processing login page
/*route.get('/secure', controller.displayLoginPage);*/
/*route.post('/secure', controller.processLoginPage);*/




//to perform logout page
/*route.get('/logout', controller.performLogout)*/
module.exports = route;



//Api test
//route.get('/register', controller.displayRegisterPage);
//route.post('/register', controller.processRegisterPage); 