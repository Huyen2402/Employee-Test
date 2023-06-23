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
};
module.exports = config;