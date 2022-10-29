const { Router } = require('express');
const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homePage);

route.get('/secure', services.secure);

route.get('/home', services.homePage);

route.get('/contact', services.contact);

route.get('/about', services.about);

route.get('/services', services.services);

route.get('/projects', services.projects);

route.get('/secure/list-users', services.usersList);

route.get('/secure/update-user', services.updateUser);


//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);





module.exports = route; 