const router = require('express').Router();
let swaggerHostLink = require('../swagger.json');
let pageLink = '';

if (swaggerHostLink.host == 'localhost:3000') {
    pageLink = `http://${swaggerHostLink.host}`;
} else if (swaggerHostLink.host == 'cse341-project2-kl.onrender.com') {
    pageLink = `https://${swaggerHostLink.host}`;
} else {
    pageLink = `<strong>Invalid Host Address:</strong> ${swaggerHostLink.host}`;
    console.log(pageLink);
}

router.use('/', require('./swagger'));

const homePageMsg = 
    `<p>This API is a mockup of a database showing fake filler employee information and fake filler customer information. Swagger UI is used to perform the CRUD operations.</p>
    <p>To access all employees, visit this site: <a href="${pageLink}/employees">${pageLink}/employees</a></p>
    <p>To access all customers, visit this site: <a href="${pageLink}/customers">${pageLink}/customers</a></p>
    <p>To access Swagger UI for the CRUD functions, visit this site: <a href="${pageLink}/api-docs">${pageLink}/api-docs</a></p>`


router.get('/', (req, res) => (
    res.send(homePageMsg)
));

router.use('/employees', require('./employees'));
router.use('/customers', require('./customers'));

module.exports = router;