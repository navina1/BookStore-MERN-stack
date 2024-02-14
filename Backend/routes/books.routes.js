module.exports = app => {
    const books = require("../controllers/books.controller");
    const router = require("express").Router();
    // Create a new book
    router.post("/", books.create);

    // Retrieve all book
    router.get("/", books.findAll);

    // Retrieve a single book with id
    router.get("/:id", books.findOne);

    // Update a book with id
    router.put("/:id", books.update);

    // Delete a book with id
    router.delete("/:id", books.delete);

    // Create a new book
    router.delete("/", books.deleteAll);

    app.use("/books", router);
}