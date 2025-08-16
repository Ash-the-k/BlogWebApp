import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
let blogArray = [];

app.use(express.static("public"));

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
        id: date.toISOString()
    };
    // console.log(blogInst);
    blogArray.push(blogInst);
    console.log("New Blog: ");
    console.log((blogInst));
    res.redirect("/read")
})

app.get("/read", (req, res) => {
    res.render("read.ejs", {blogArray: blogArray, currentPath: '/read'});
});

app.post("/edit", (req, res) => {
    const { blogId, blogTitle, blogContent } = req.body;
    const blogIndex = blogArray.findIndex(Element => Element.id === blogId);
    console.log("Blog Index:");
    console.log(blogIndex);
    if (blogIndex !== -1) {
        blogArray[blogIndex].blogTitle = blogTitle;
        blogArray[blogIndex].blogContent = blogContent;
    }
    console.log("Edited Blog:");
    console.log(blogArray[blogIndex]);
    res.redirect("/read");
})

app.post("/delete", (req, res) => {
    const { blogId } = req.body;
    blogArray = blogArray.filter(element =>element.id !== blogId);
    console.log("Deleted Blog ID: " + blogId);
    res.redirect("/read");
});


app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});