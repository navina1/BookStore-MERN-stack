const db = require("../models");
const Authors = db.authors;

//create and save new authors
exports.create = async (req, res) => {
    try {
        // Validation
        if (!req.body.name) {
            return res.status(400).send({ message: "Please enter the title field" });
        }

        // Create Author instance
        const author = new Authors({
            name: req.body.name,
            nationality: req.body.nationality,
            bookswritten: req.body.bookswritten,
        });

        // Save author in the database
        const savedAuthor = await author.save();

        res.send(savedAuthor);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the author"
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
    Authors.find(conditions)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Authors.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Author with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Author with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Authors.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Author with id=${id}. Maybe Author was not found!`
                });
            } else res.send({ message: "Author was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Author with id=" + id
            });
        });
};

// Delete a Author with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Authors.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
                });
            }
            res.send({
                message: "Author was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error deleting author:", err);
            res.status(500).send({
                message: "Could not delete Author with id=" + id
            });
        });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Authors.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Author were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Author."
            });
        });
};