const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'secret_key_for_bar_app';

const User = require('../models/user.model');

exports.findAll = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        User.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving users.'
                });
            else res.send(data);
        });
    });
}

exports.delete = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        User.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Could not delete User with id ${req.params.id}`
                    });
                }
            } else res.send({
                message: `User was deleted successfully`
            });
        });
    });
};

exports.create = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
        }

        let password = bcrypt.hashSync(req.body.password, 8);

        const user = new User({
            name: req.body.name,
            password: password
        });

        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the User.'
                });
            else res.send(data);
        });
    });
};

exports.update = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        if (!req.body) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
        }

        let password = bcrypt.hashSync(req.body.password, 8);
        let user = new User({
            name: req.body.name,
            password: password
        });

        User.updateById(req.params.id, user, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating User with id ${req.params.id}`
                    });
                }
            } else res.send(data);
        });
    });

}

exports.login = (req, res) => {
    User.getPass(req.body.name, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        } else {
            if (data.length === 0) {
                res.status(404).send({
                    message: "User not found"
                });
            } else {
                let passwordIsValid = bcrypt.compareSync(req.body.password, data[0].password);
                if (passwordIsValid) {
                    const token = jwt.sign({ id: data[0].id }, JWT_SECRET, { expiresIn: '20h' });
                    res.json({ token });
                } else {
                    res.status(404).send({
                        message: "User not found"
                    });
                }
            }
        }
    });
};

exports.admin = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        res.json(data);
    });
};

exports.findOne = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        User.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving User with id ${req.params.id}`
                    });
                }
            } else res.send(data);
        });
    });
}