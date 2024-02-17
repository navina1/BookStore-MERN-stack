const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = new mongoose.Schema({
        bookid: String,
        userid: String,
        soldat: String,
    },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const PurchaseHistory = module.exports = mongoose.model('purchase_history', schema);
    return PurchaseHistory;
}

