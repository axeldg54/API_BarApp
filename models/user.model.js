const sql = require('../config/db.config');

const User = function(user) {
    this.name = user.name;
    this.password = user.password;
};

User.getAll = result => {
    sql.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.getPass = (name, result) => {
    sql.query(`SELECT password FROM users WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
}

User.updateById = (id, user, result) => {
    sql.query('UPDATE users SET name = ?, password = ? WHERE id = ?', [user.name, user.password, id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, {id: id, ...user});
    });
}

User.create = (newUser, result) => {
    sql.query('INSERT INTO users (name, password) VALUES (?,?)', [newUser.name, newUser.password], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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

User.remove = (id, result) => {
    sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
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

module.exports = User;
