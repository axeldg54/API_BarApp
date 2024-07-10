const users = require('../controllers/users.controller');
module.exports = (app) => {
    app.post('/connexion', users.login);
    app.get('/admin', users.admin)
    app.get('/users', users.findAll);
    app.get('/users/:id', users.findOne);
    app.delete('/users/:id', users.delete);
    app.post('/users/:id', users.update);
    app.post('/add_user', users.create);
}
        
