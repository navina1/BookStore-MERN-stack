const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = new mongoose.Schema({
        title: { type: String, required: true },
        author: String,
        description: String,
        published: Boolean
    },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Book = module.exports = mongoose.model('Book', schema);
    return Book;
}

