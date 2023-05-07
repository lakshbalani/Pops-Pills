const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.post("/api/get", (req, res) => {
    let id = req.body.id;
    
    db.query("SELECT commentsjson FROM comments WHERE id = ?",[id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating the post
app.post('/api/create', (req, res) => {
    let id = req.body.id;
    let jsonbody = req.body.content;

    db.query("INSERT INTO comments (id, commentsjson) VALUES (?, ?)", [id, JSON.stringify(jsonbody)], (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
            return
        }
        console.log(result)
        db.query("SELECT commentsjson FROM comments WHERE id = ?",[id], (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


// api to initialize an empty tree with a random id
app.post('/api/init', (req, res) => {
    let id = req.body.id;
    let jsonbody = {
        "id": 1,
        "items": []
    };

    db.query("INSERT INTO comments (id, commentsjson) VALUES (?, ?)", [id, JSON.stringify(jsonbody)], (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        console.log(result)
        res.send(result)
    });
})