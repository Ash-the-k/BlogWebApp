import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
let blogArray = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { currentPath: "/" });
});

app.post("/submit", (req, res) => {
    // console.log(req.body);
    let date = new Date();
    const blogInst = {
        ...req.body, 
        id: date
    };
    // console.log(blogInst);
    blogArray.push(blogInst);
    console.log(blogArray);
    res.redirect("/read")
})

app.get("/read", (req, res) => {
    res.render("read.ejs", {blogArray: blogArray, currentPath: '/read'});
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});