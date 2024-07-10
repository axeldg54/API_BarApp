const Drink = require('../models/drink.model');

exports.findAll = (req, res) => {
    Drink.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving drinks.'
            });
        else res.send(data);
    });
};


exports.delete = (req, res) => {
    Drink.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Drink with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Drink with id ${req.params.id}`
                });
            }
        } else res.status(200).send({
            message: `Drink was deleted successfully`
        });
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const drink = new Drink({
        name: req.body.name,
        desc: req.body.desc,
        img: req.body.img,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    });

    Drink.create(drink, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Drink.'
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Drink.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Drink with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Drink with id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    Drink.updateById(req.params.id, new Drink(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Drink with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Drink with id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
}