const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => (
    res.send('This API is a mockup of a database showing fake filler employee information and fake filler customer information.')
));

router.use('/employees', require('./employees'));
router.use('/customers', require('./customers'));

module.exports = router;