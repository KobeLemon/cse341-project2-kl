const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy
const cors = require('cors');
let swaggerHostLink = require('./swagger.json');
let pageLink = '';

if (swaggerHostLink.host == 'localhost:3000') {
    pageLink = `http://${swaggerHostLink.host}`;
} else if (swaggerHostLink.host == 'cse341-project2-kl.onrender.com') {
    pageLink = `https://${swaggerHostLink.host}`;
} else {
    pageLink = `<strong>Invalid Host Address:</strong> ${swaggerHostLink.host}`;
    console.log(pageLink);
}

const homePageMsg = 
    `<p>This API is a mockup of a database showing fake filler employee information and fake filler customer information. Swagger UI is used to perform the CRUD operations.</p>
    <p>To access all employees, visit this site: <a href="${pageLink}/employees">${pageLink}/employees</a></p>
    <p>To access all customers, visit this site: <a href="${pageLink}/customers">${pageLink}/customers</a></p>
    <p>To access Swagger UI for the CRUD functions, visit this site: <a href="${pageLink}/api-docs">${pageLink}/api-docs</a></p>`

// router.get('/', (req, res) => (
//     res.send(homePageMsg)
// ));

const port3000 = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // Basic express session ({..}) init
    .use(passport.initialize())
    // init passport on every route call
    .use(passport.session())
    // allow passport to use "express-session"
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        ),
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes/index'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done){
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile)
        // })
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `<p>Logged in as ${req.session.user.displayName}</p> ${homePageMsg}` : `<p>Logged Out</p> ${homePageMsg}`)});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port3000, () => console.log(`Database is listening & Node is running on port ${port3000}`));
    }
});