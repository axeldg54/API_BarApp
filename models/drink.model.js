const sql = require('../config/db.config');

const Drink = function(drink) {
    this.name = drink.name;
    this.desc = drink.desc;
    this.img = drink.img;
    this.price = drink.price;
    this.category = drink.category;
    this.stock = drink.stock;
};

Drink.getAll = result => {
    sql.query('SELECT * FROM drinks', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Drink.create = (newDrink, result) => {
    console.log(newDrink);
    sql.query('INSERT INTO drinks (title, description, image, price, type, stock) VALUES (?,?,?,?,?,?)', [newDrink.name, newDrink.desc, newDrink.img, newDrink.price, newDrink.category, newDrink.stock], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newDrink});
    });
}

Drink.remove = (id, result) => {
    sql.query('DELETE FROM drinks WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, res);
    });
}

Drink.updateById = (id, drink, result) => {
    sql.query('UPDATE drinks SET title = ?, description = ?, image = ?, price = ?, type = ?, stock = ? WHERE id = ?', [drink.name, drink.desc, drink.img, drink.price, drink.category, drink.stock, id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, {id: id, ...drink});
    });
}

Drink.findById = (id, result) => {
    sql.query('SELECT * FROM drinks WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
}

module.exports = Drink;
