module.exports = {
    MONGO_IP : process.env.MONGO_IP || "mongo",
    MONGO_PORT : process.env.MONGO_PORT || 27017,
    MONGO_USER : process.env.MONGO_USER || "gaurang",
    MONGO_PASSWORD : process.env.MONGO_PASSWORD || 123,
    REDIS_URL : process.env.REDIS_URL || "redis",
    REDIS_PORT : process.env.REDIS_PORT || 6379,
    REDIS_SECRET : process.env.REDIS_SECRET
}