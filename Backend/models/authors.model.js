const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = new mongoose.Schema({
        name: { type: String, required: true },
        nationality: String,
        bookswritten:  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
          }],
    },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Author = module.exports = mongoose.model('author', schema);
    return Author;
}

