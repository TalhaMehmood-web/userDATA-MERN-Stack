import express from "express";
import connectObj from "./db.js"
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import cors from "cors";
const app = express();
const port = 4000;
const hostName = "127.0.0.1";
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5500"
}))
let db;
connectObj.connectionToDb((err) => {
    if (!err) {
        app.listen(port, hostName, () => {

            console.log("connection successful");
        })
        db = connectObj.getDb()
    }
})
app.get("/users", (req, res) => {
    // let page = req.query.page || 0;
    // let usersPerPage = 3;
    let users = [];
    db.collection("users")
        .find()
        .sort({ name: 1 })
        // .skip(page * usersPerPage)
        // .limit(usersPerPage)
        .forEach(user => {
            users.push(user)
        })
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "could not fetch the documents" })
        })
})
app.get("/users/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("users")
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
    }
    else {
        res.status(500).json({ error: "doc not found" })
    }

})

app.post("/users", (req, res) => {
    const user = req.body;
    db.collection("users")
        .insertOne(user)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.send(500).json({
                message: error.message
            })
        })
})
app.delete("/users/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("users")
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(500).json({ message: "user not found" })
            })
    }
    else {
        res.status(500).json({ error: "not a valid id" })
    }

})
app.put("/users/:id", (req, res) => {
    const update = req.body;
    if (ObjectId.isValid(req.params.id)) {
        db.collection("users")
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(500).json({ message: "cannot update the user" })
            })
    }
    else {
        res.status(500).json({ error: "not a valid id" })
    }

})