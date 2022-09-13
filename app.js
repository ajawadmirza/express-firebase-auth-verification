var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var admin = require("firebase-admin");
var port = 9000;
var serviceAccount = require("./private-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.post('/auth', async function (req, res) {
    idToken = req.body['idToken'];
    
    try {

        user = await admin
            .auth()
            .verifyIdToken(idToken);

        res.send(user);

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});



app.listen(port);
console.log('Server started! At http://localhost:' + port);