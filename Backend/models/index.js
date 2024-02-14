const dbConfig=require("../config/db.config");
const mongoose=require("mongoose");

const db={};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.books=require("./books.model")(mongoose);
db.genre=require("./genre.model")(mongoose);

module.exports = db;
