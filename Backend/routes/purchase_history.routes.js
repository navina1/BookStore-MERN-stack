module.exports = app => {
    const purchase_history = require("../controllers/purchase_history.controller");
    const router = require("express").Router();
    // Create a new purchase_history
    router.post("/", purchase_history.create);

    // Retrieve all purchase_history
    router.get("/", purchase_history.findAll);

    // Retrieve a single purchase_history with id
    router.get("/:id", purchase_history.findOne);

    // Update a purchase_history with id
    router.put("/:id", purchase_history.update);

    // Delete a purchase_history with id
    router.delete("/:id", purchase_history.delete);

    // Create a new purchase_history
    router.delete("/", purchase_history.deleteAll);

    app.use("/purchase_history", router);
}