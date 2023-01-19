const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//las contraseñas de mongodb
const dotenv = require('dotenv');
dotenv.config();


const CONNECTION_URL = process.env.MONGODB_URI;
const DATABASE_NAME = "accounting_department";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
const port = 5000;

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("personnel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/",(req,res)=>{
    console.log(`Se conecto al puerto ${port}`);

    res.send(`Sergito trabaja en el puerto: ${port}`);
});

app.post("/personnel", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/personnel", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//me salio todo bien el trabajo