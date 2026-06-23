var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient; 

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = 'mongodb://admin:password@mongodb:27017/user-account?authSource=admin';
const dbName = 'user-account';

// Main Page Route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Get Profile Route (Modernized)
app.get('/get-profile', async function (req, res) {
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const result = await db.collection('users').findOne({ userId: 1 });
        res.send(result || {});
    } catch (err) {
        console.error("Error fetching profile:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    } finally {
        if (client) client.close();
    }
});

// Update Profile Route (Modernized & Stable)
app.post('/update-profile', async function (req, res) {
    var userObj = req.body;
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        userObj['userId'] = 1;
        
        await db.collection('users').updateOne(
            { userId: 1 }, 
            { $set: userObj }, 
            { upsert: true }
        );
        
        console.log('Successfully updated or inserted into database  yooooo goku !');
        res.send(userObj);
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    } finally {
        if (client) client.close();
    }
});


app.get('/profile-picture', function (req, res) {
    try {
        // This forces Node to look in the exact same folder as server.js
        var img = fs.readFileSync(path.join(__dirname, 'profile-1.jpg'));
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    } catch (e) {
        console.error("Image read error:", e.message); // This will log the exact missing path to your docker console
        res.status(404).send("Image not found");
    }
});

app.listen(3000, function () {
    console.log("app listening on port 3000!");
});