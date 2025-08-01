//Imports
import express from "express";
import fs from "fs";
const router = express.Router();

const filePath = "./api/blog.json";

//health check route
router.get("/health", (req, res) => {
  res.send("API is running smoothly");
});

//routes to get all blog posts
router.get("/", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const posts = JSON.parse(data);
    res.json(posts);
  });
});

//routes to get a blog post by its "post_id"
router.get("/:id", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const posts = JSON.parse(data);
    const postId = parseInt(req.params.id, 10);
    const post = posts.find((p) => p.post_id === postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  });
});

//route to create a new blog post
router.post("/", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Cannot read file" });
    }
    const posts = JSON.parse(data);// Parse the JSON data
    const maxId = posts.reduce((max, p) => p.post_id > max ? p.post_id : max, 0);// Find the maximum post_id
    // Create a new post object with the next available post_id
    const newPost = {
      post_id: maxId + 1,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    };
    posts.push(newPost);// Add the new post to the posts array
    // Write the updated posts array back to the file
    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Cannot write to file" });
      }
      res.status(201).json(newPost);
    });
  });
});

//route to update a blog post by its "post_id"
router.put("/:id", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Cannot read file" });
    }
    const posts = JSON.parse(data);
    const postId = parseInt(req.params.id, 10);// Parse the post_id from the request parameters
    // Find the index of the post to update
    const postIndex = posts.findIndex((p) => p.post_id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Create an updated post object with the new data or existing data if not provided
    const updatedPost = {
      post_id: postId,
      title: req.body.title || posts[postIndex].title,
      author: req.body.author || posts[postIndex].author,
      body: req.body.body || posts[postIndex].body,
    };
    posts[postIndex] = updatedPost;
    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Cannot write to file" });
      }
      res.json(updatedPost);
    });
  });
});

//route to delete a blog post by its "post_id"
router.delete("/:id", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Cannot read file" });
    }
    const posts = JSON.parse(data);
    const postId = parseInt(req.params.id, 10);
    const postIndex = posts.findIndex((p) => p.post_id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    posts.splice(postIndex, 1);
    fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Cannot write to file" });
      }
      res.status(201).json({ message: "Post deleted successfully" });
    });
  });
});

export default router;
