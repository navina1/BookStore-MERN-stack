const dbConfig=require("../config/db.config");
const mongoose=require("mongoose");

const db={};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.books=require("./books.model")(mongoose);
db.genre=require("./genre.model")(mongoose);
db.authors=require("./authors.model")(mongoose);
db.users=require("./users.model")(mongoose);
db.purchase_history=require("./purchase_history.model")(mongoose);

module.exports = db;
