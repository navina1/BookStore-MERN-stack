const db = require("../models");
const PurchaseHistory = db.purchase_history;

//create and save new purchase_historys
exports.create = async (req, res) => {
    try {
        // Validation
        if (!req.body.bookid) {
            return res.status(400).send({ message: "Please enter the bookid field" });
        }

        // Validation
        if (!req.body.userid) {
            return res.status(400).send({ message: "Please enter the userid field" });
        }
        
        // Validation
        if (!req.body.soldat) {
            return res.status(400).send({ message: "Please enter the soldat field" });
        }
        // Create PurchaseHistory instance
        const purchase_history = new PurchaseHistory({
            bookid: req.body.bookid,
            userid: req.body.userid,
            soldat: req.body.soldat,
        });

        // Save purchase_history in the database
        const savedPurchaseHistory = await purchase_history.save();

        res.send(savedPurchaseHistory);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the purchase_history"
        });
    }

}
exports.findAll = (req, res) => {
    // Extract search parameters from request query
    const { bookid, userid, soldat} = req.query;

    // Define conditions based on the presence of each parameter
    const conditions = {};
    if (bookid) {
        conditions.bookid = { $regex: new RegExp(bookid), $options: "i" };
    }
    if (userid) {
        conditions.userid = { $regex: new RegExp(userid), $options: "i" };
    }
    if (soldat) {
        conditions.soldat = { $regex: new RegExp(soldat), $options: "i" };
    }
    PurchaseHistory.find(conditions)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving purchase_historys."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    PurchaseHistory.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found PurchaseHistory with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving PurchaseHistory with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    PurchaseHistory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update PurchaseHistory with id=${id}. Maybe PurchaseHistory was not found!`
                });
            } else res.send({ message: "PurchaseHistory was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PurchaseHistory with id=" + id
            });
        });
};

// Delete a PurchaseHistory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PurchaseHistory.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete PurchaseHistory with id=${id}. Maybe PurchaseHistory was not found!`
                });
            }
            res.send({
                message: "PurchaseHistory was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error deleting purchase_history:", err);
            res.status(500).send({
                message: "Could not delete PurchaseHistory with id=" + id
            });
        });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    PurchaseHistory.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} PurchaseHistory were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all PurchaseHistory."
            });
        });
};