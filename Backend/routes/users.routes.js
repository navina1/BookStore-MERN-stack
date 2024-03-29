module.exports = app => {
    const users = require("../controllers/users.controller");
    const router = require("express").Router();
    // Create a new user
    router.post("/", users.create);

    // Retrieve all user
    router.get("/", users.findAll);

    // Retrieve a single user with id
    router.get("/:id", users.findOne);

    // Update a user with id
    router.put("/:id", users.update);

    // Delete a user with id
    router.delete("/:id", users.delete);

    // Create a new user
    router.delete("/", users.deleteAll);

    app.use("/users", router);
}