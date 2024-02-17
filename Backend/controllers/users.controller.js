const db = require("../models");
const Users = db.users;

//create and save new users
exports.create = async (req, res) => {
    try {
        // Validation
        if (!req.body.name) {
            return res.status(400).send({ message: "Please enter the name field" });
        }

        // Create User instance
        const user = new Users({
            name: req.body.name,
            nationality: req.body.nationality,
            bookspurchased: req.body.bookspurchased,
        });

        // Save user in the database
        const savedUser = await user.save();

        res.send(savedUser);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user"
        });
    }

}
exports.findAll = (req, res) => {
    // Extract search parameters from request query
    const { name, nationality } = req.query;

    // Define conditions based on the presence of each parameter
    const conditions = {};
    if (name) {
        conditions.name = { $regex: new RegExp(name), $options: "i" };
    }
    if (nationality) {
        conditions.nationality = { $regex: new RegExp(nationality), $options: "i" };
    }
    Users.find(conditions)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
            res.send({
                message: "User was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error deleting user:", err);
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Users.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} User were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all User."
            });
        });
};