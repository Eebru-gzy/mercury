module.exports = {
    auth_key: process.env.JWTSECRET,
    redis: {
        /*
         Docker exposes the IP and PORTs in specific variable names during linkage time.
         They are as follows:
         - IP = REDIS_PORT_6379_TCP_ADDR
         - PORT = REDIS_PORT_6379_TCP_PORT

         We look for those first, and if not present, we look for passed in
         environment vars... or take defaults where given.
         */
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT_6379_TCP_PORT || process.env.REDIS_PORT || 6379,
        database: process.env.REDIS_DATABASE || 0,
        password: process.env.REDIS_PASSWORD,
        batch_ttl: process.env.ITEM_TTL || 300,
        list_ttl: process.env.LIST_TTL || 30
    },
    mysql: {
        connection: {
            host: '127.0.0.1',
            port: 3306,
            database: 'mercury',
            user: 'root',
            password: '[Eebru-eebru]g=1',
        },
        pool: {
            min: (process.env.DATABASE_POOL_MIN) ? parseInt(process.env.DATABASE_POOL_MIN) : 2,
            max: (process.env.DATABASE_POOL_MAX) ? parseInt(process.env.DATABASE_POOL_MAX) : 2
        }
    },
    port: process.env.PORT,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    bcrypt_salt_rounds: 12
}