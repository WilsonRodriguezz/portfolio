const { Router } = require('express');
const express = require('express');
const route = express.Router();
const services = require('../services/render');

route.get('/', services.homePage);

route.get('/home', services.homePage);

route.get('/contact', services.contact)

route.get('/about', services.about)

route.get('/services', services.services)

route.get('/projects', services.projects)

route.get("/public/pdf/Wilson%20Rodriguez's%20resumen.pdf", services.resumen)




module.exports = route; 