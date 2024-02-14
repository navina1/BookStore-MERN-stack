const db=require("../models");
const Genre=db.genre

//create and save new genre
exports.create = async(req, res) => {
    try {
        // Validation
        if (!req.body.title) {
            return res.status(400).send({ message: "Please enter the title field" });
        }

        // Create Book instance
        const genre = new Genre({
            title: req.body.title,
            description: req.body.description,
        });

        // Save book in the database
        const savedGenre = await genre.save();

        res.send(savedGenre);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the book"
        });
    }
}

//Get all  genres
exports.findAll = (req, res) => {
    // Extract search parameters from request query
    const { title, description} = req.query;

    // Define conditions based on the presence of each parameter
    const conditions = {};
    if (title) {
        conditions.title = { $regex: new RegExp(title), $options: "i" };
    }
    if (description) {
        conditions.description = { $regex: new RegExp(description), $options: "i" };
    }
    Genre.find(conditions)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving genre."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Genre.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Genre with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Genre with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Genre.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Genre with id=${id}. Maybe Genre was not found!`
          });
        } else res.send({ message: "Genre was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Genre with id=" + id
        });
      });
  };
  
  // Delete a Book with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;

    Genre.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
                });
            }
            res.send({
                message: "Genre was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error deleting Genre:", err);
            res.status(500).send({
                message: "Could not delete Genre with id=" + id
            });
        });
};

  
  // Delete all Tutorials from the database.
  exports.deleteAll = (req, res) => {
    Genre.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Genre were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Genre."
        });
      });
  };