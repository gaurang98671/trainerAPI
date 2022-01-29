const express = require('express')
const mongo = require('mongoose')
const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, REDIS_SECRET}  = require("./config/configurations")
const auth = require("./routes/auth")
const profile = require('./routes/userProfileRoutes')
const exercise = require('./routes/exercise')
const redis = require('redis')
var session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cors = require('cors')


let redisClient = redis.createClient(
    {
        host:  REDIS_URL,
        port: REDIS_PORT
    }
)
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

const app = express()

const port = process.env.PORT || 8080
app.use(cors({origin: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static("static"))
const retryMongoConnect = ()=>{
    const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    mongo.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
        console.log("Successfully connected to database...")
    }).catch((e)=>{
        console.log("Connection failed trying again...")
        setTimeout(retryMongoConnect, 5000)
    });
}
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(session({
    store: new RedisStore({ client : redisClient }), 
    secret: REDIS_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie : {
        secure : false,
        resave : false,
        httpOnly : true,
        saveUninitialized : false
    } 
}));


//Connect to mongodb database
retryMongoConnect()

//Endpoints
app.use("/auth", auth)
app.use("/profile", profile)
app.use("/exercise", exercise)


app.listen(port, ()=>{
    console.log("Listening on port " + port)
})
