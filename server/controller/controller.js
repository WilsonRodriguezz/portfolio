var Userdb = require('../model/model');

//modules for authentication
let mongoose = require('mongoose');
let passport = require('passport');

//authentication
//create the user model instance
let userModel = require('../model/user');
let User = userModel.User; // alias


module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if (!req.user) {
        res.render('authentication', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''

        })
    }
    else {
        return res.redirect('/secure/list-users')
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            //server error
            if (err) {
                return next(err);
            }
            //is there's a user login error
            if (!user) {
                req.flash('loginMessage', 'Authentication error')
                return res.redirect('/secure')
            }
            req.login(user, (err) => {
                //server error?
                if (err) {
                    return next(err);
                }
                return res.redirect('/secure/list-users')
            });
        }
    )(req, res, next);
}


//display registering page
module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.render('registration',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
    }
    else {
        return res.redirect('/');
    }
}


//process registering page



module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password:req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error:inserting New User");
            if (err.nme == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error:User Already Exists!'
                );
                console.log('Error: UserAlready Exists!')
            }
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
        }
        else {
            // if no error exists, then registration is successful
            // redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}


module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}



//contact list
//create and save new user 

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" })
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        })


}

//retrieve and return all users/retrieve and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id: " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id: " + id })
            })

    } else {
        Userdb.find().sort({ name: 1 })
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retriving user information" })
            })
    }

}



//update a new identified user by userId
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" })
        })
}

//delete a user with specified user id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted succesfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id: " + id
            });
        });
}
