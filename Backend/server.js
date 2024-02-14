const express=require("express");


const app=express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db=require("./models");
db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.log(err);
        process.exit()
    });

    app.get("/", (req, res) => {
        return res.status(234).send("Welcome to BookStore Application")
    })
    
    require("./routes/books.routes")(app);
    require("./routes/genre.routes")(app);
    const PORT =8080;
    app.listen(PORT, () => { console.log('Server is running on port 8080') });