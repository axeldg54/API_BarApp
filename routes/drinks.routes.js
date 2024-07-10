module.exports = app => {
    const drinks = require('../controllers/drinks.controller');
    app.get('/api/drinks', drinks.findAll);
    app.post('/add_product', drinks.create);
    app.delete('/api/drinks/:id', drinks.delete);
    app.post('/api/drinks/:id', drinks.update);
    app.get('/api/drinks/:id', drinks.findOne);
}
