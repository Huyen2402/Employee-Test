const config = {
    app: {
        port: process.env.PORT || 3003,
    },
    db: {
        HOST: "localhost",
        PORT: "1433",
        USER: "sa",
        PASSWORD: "123456",
        DB: "Employee",
        dialect: "mssql",
            pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
            }
    },
    cloudinary: {
        cloud_name: "datidmq6e",
        api_key: "759781736949789",
        api_secret: "ch7sy_0v7lcV_n0z1GxZcKP3wSs",
    }
};
module.exports = config;