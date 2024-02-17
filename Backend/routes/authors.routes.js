module.exports = app => {
    const authors = require("../controllers/authors.controller");
    const router = require("express").Router();
    // Create a new author
    router.post("/", authors.create);

    // Retrieve all author
    router.get("/", authors.findAll);

    // Retrieve a single author with id
    router.get("/:id", authors.findOne);

    // Update a author with id
    router.put("/:id", authors.update);

    // Delete a author with id
    router.delete("/:id", authors.delete);

    // Create a new author
    router.delete("/", authors.deleteAll);

    app.use("/authors", router);
}