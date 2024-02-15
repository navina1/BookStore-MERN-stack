const db = require("../models");
const Books = db.books;
const Genre = db.genre;
//create and save new books

exports.create = async (req, res) => {
    try {
        // Validation
        if (!req.body.title) {
            return res.status(400).send({ message: "Please enter the title field" });
        }
        // Check if the genre exists
        const genreIds = req.body.genreId; // Assuming req.body.genreId is an array of genre IDs

        // Find genres with the given IDs
        const existingGenres = await Genre.find({ _id: { $in: genreIds } });

        // Check if any genre IDs were not found
        if (existingGenres.length !== genreIds.length) {
            throw new Error('One or more genres not found');
        }
        // Create Book instance
        const book = new Books({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published,
            genre: req.body.genreId,
        });

        // Save book in the database
        const savedBook = await book.save();

        res.send(savedBook);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the book"
        });
    }

}
exports.findAll = (req, res) => {
    // Extract search parameters from request query
    const { title, author, description, published, genreId } = req.query;

    // Define conditions based on the presence of each parameter
    const conditions = {};
    if (title) {
        conditions.title = { $regex: new RegExp(title), $options: "i" };
    }
    if (author) {
        conditions.author = { $regex: new RegExp(author), $options: "i" };
    }
    if (description) {
        conditions.description = { $regex: new RegExp(description), $options: "i" };
    }
    if (published !== undefined) {
        conditions.published = published;
    }
    if (genreId) {
        // If genreId is provided as an array, use $in operator
        conditions.genre = Array.isArray(genreId) ? { $in: genreId } : genreId;
    }
    Books.find(conditions)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Books.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Books.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            }
            res.send({
                message: "Book was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error deleting book:", err);
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Books.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Book were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Book."
            });
        });
};