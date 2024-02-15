const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = new mongoose.Schema({
        title: { type: String, required: true },
        description: String,
    },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Genre = module.exports = mongoose.model('Genre', schema);
    return Genre;
}

