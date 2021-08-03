const express = require('express')
const mongo = require('mongoose')
const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, REDIS_SECRET}  = require("./config/configurations")
const auth = require("./routes/auth")
const redis = require('redis')
var session = require('express-session')
const RedisStore = require('connect-redis')(session)

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

const retryMongoConnect = ()=>{
    const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    mongo.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
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

app.use("/auth", auth)


app.listen(port, ()=>{
    console.log("Listening on port " + port)
})
