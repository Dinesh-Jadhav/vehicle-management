    var express = require('express');
    var app = express(); // create our app w/ express
    var morgan = require('morgan'); // log requests to the console (express4)
    var url = require('url');
    var http = require('http');



    var stormpath = require('express-stormpath');
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var multer = require('multer');

    var mysql = require('mysql');


    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var crypto = require('crypto');
    var session = require('express-session');
    app.use(express.cookieParser());

    /* module.exports = function Sessions(url, secret) {
       var store = new RedisStore({ url: url });
       var session = expressSession({
         secret: 'ssshhhhh',
         store: store,
         resave: true,
         saveUninitialized: true
       });

       return session;
     };
     */

    var formidable = require("formidable");
    var fs = require('fs-extra');
    var randomstring = require("randomstring");
    var Q = require('q');
    var step = require('step');

    var admin = require("./admin");
    var user = require("./user");
    var vendor = require("./vendor");
    var recharge = require("./recharge");
    var trip = require("./trip");
    var vehicle = require("./vehicle");
    var router = require("./routes");
    var pool = require('./db');
    var moment = require('moment');


    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

    app.use(morgan('dev')); // log every request to the console
    app.use(multer({ dest: './uploads' }));
    app.use(bodyParser.urlencoded({ 'extended': 'true' }));
    // parse application/x-www-form-urlencoded
    app.use(url);


    app.use(bodyParser.json());
    // parse application/json

    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // parse  app.use(methodOverride());

    app.use(express.cookieParser());
    app.use(session({
        secret: 'ssshhhhh',
        saveUninitialized: true,
        resave: true
    }));



    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'kalika.deltabee@gmail.com',
            pass: 'Delta09098888!@#'
        }
    }));



    /*Adimin login & other functionality*/
    app.post('/login', admin.login(crypto, pool));
    app.get('/authentication/:access', admin.authenticated);
    app.get('/logout', admin.logout);
    app.post('/resetPasswordProcess', admin.resetPasswordProcess(transporter, randomstring, pool));
    app.post('/confirmToken', admin.confirmToken(pool));
    app.post('/updatePassword', admin.updatePassword(crypto, pool));


    /*Vendore list & other functionality*/
    app.post('/vendorLogin', vendor.vendorLogin(crypto, pool));
    app.get('/vendorAuthentication/:access', vendor.authenticated);
    app.get('/vendorLogout', vendor.logout);
    app.post('/vendorResetPassword', vendor.resetPasswordProcess(transporter, randomstring, pool));
    app.post('/vendorConfirmToken', vendor.confirmToken(pool));
    app.post('/vendorUpdatePassword', vendor.updatePassword(crypto, pool));
    app.get('/vendorList', vendor.vendorList(pool));
    app.post('/addVendor', vendor.addVendor(formidable, fs, pool, crypto, transporter));
    app.get('/getVendorsList', vendor.getVendorsList(pool));
    app.get('/singleVendorData', vendor.singleVendorData(pool));
    app.post('/updateMultiplier', vendor.updateMultiplier(pool));
    app.post('/updateUrl', vendor.updateUrl(pool));
    app.post('/updateName', vendor.updateName(pool));
    app.post('/updatePin', vendor.updatePin(pool));
    app.post('/updateProfile', vendor.updateProfile(formidable, fs, pool));
    //app.post('/editVendor',vendor.editVendor(formidable,pool));

    /*Recharge list & other functionality*/
    app.get('/rechargeList', recharge.rechargelist(pool));
    app.post('/addRecharge', recharge.addRecharge(pool));

    /*Trip list & other functionality*/
    app.get('/tripList', trip.triplist(pool));
    app.get('/completedTripList', trip.completedTripList(pool));
    app.get('/cancelledTripList', trip.cancelledTripList(pool));
    app.post('/addTrip', trip.addTrip(pool));
    app.get('/getOnGoingTripSingle/:id', trip.getOnGoingSingle(pool));
    app.post('/updateOnGoingTripSingle', trip.updateOnGoingSingle(pool));
    app.post('/addToComplete', trip.addToComplete(step, pool, moment));
    app.post('/CancelTrip', trip.CancelTrip(pool));
    app.get('/triplistForVendor', trip.triplistForVendor(pool));
    app.get('/vendorcompleteTripList', trip.vendorcompleteTripList(pool));



    /*VEHICLElist & other functionality*/
    app.get('/vehicleList', vehicle.vehiclelist(pool));
    app.get('/getvehiclelist', vehicle.getvehiclelist(pool));
    app.get('/idleVehicleList', vehicle.idleVehicleList(pool));
    app.post('/addVehicle', vehicle.addVehicle(pool));
    app.post('/activateVehicle', vehicle.activateVehicle(pool));
    app.post('/deActivateVehicle', vehicle.deActivateVehicle(pool));
    app.post('/VehicleList', vehicle.VehicleList(pool));

    app.post('/updateExchangeRate', admin.updateExchangeRate(pool));
    app.get('/getExchangeRate', admin.getExchangeRate(pool));

    app.post('/addExchangeRequest', admin.addExchangeRequest(pool));
    app.get('/getExchangeRequest', admin.getExchangeRequest(pool));
    app.get('/getExchange', admin.getExchange(pool));
    app.post('/updateExchangeStatus', admin.updateExchangeStatus(pool));

    /*User list & other functionality*/
    app.get('/userList', user.userlist(pool));
    app.post('/addUser', user.addUser(formidable, fs, pool));
    app.post('/editUser', user.editUser(formidable, fs, pool));
    app.get('/getuserList', user.getuserlist(pool));
    app.get('/singleUserData/:id', user.singleUserData(pool));
    app.post('/deleteUser', user.deleteUser(pool));


    app.use(app.router);
    /*Routing Handler*/

    app.listen(process.env.PORT || 3000);
    console.log("App listening on port 3000");
