const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = new mongoose.Schema({
        title: { type: String, required: true },
        author: String,
        description: String,
        published: Boolean,
        genre: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
            required: true
          }],
        quantity: Number, // Quantity of books in the store (if it's a physical book)
        price: Number      // Price of one copy of the book (if it's digital, this will be
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

