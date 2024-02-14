module.exports = app => {
    const genre = require("../controllers/genre.controller");
    const router = require("express").Router();
    
    // Create a new Genre
    router.post("/", genre.create);
    
    // Retrieve all Genre
    router.get("/", genre.findAll);

    // Retrieve Genre by id
    router.get("/:id", genre.findOne);

    // Update a genre with id
    router.put("/:id", genre.update);

    // Delete a genre with id
    router.delete("/:id", genre.delete);

    // delete all genre
    router.delete("/", genre.deleteAll);
    
    app.use("/genre", router);
}