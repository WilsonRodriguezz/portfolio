const axios = require('axios');



exports.homePage = (req, res) => {
    res.render('index');
}

exports.contact = (req, res) => {
    res.render('contact');
}

exports.about = (req, res) => {
    res.render('about');
}

exports.services = (req, res) => {
    res.render('services');
}

exports.projects = (req, res) => {
    res.render('projects');
}

exports.secure = (req, res) => {
    res.render('authentication')
}

exports.usersList = (req, res) => {
    //make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            res.render('index-contactList', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.updateUser = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render('updateUser-contactList', { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

