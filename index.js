const app = require('./app');
const config = require('./config');
const sql = require("mssql");
const PORT = config.app.port;
const Sequelize = require("sequelize");
const db = require("./db/index");
const deparment_employee_router = require("./routes/deparment_employeeRoute");
const deparment_router = require("./routes/departmentRoute");
const employee_router = require("./routes/employeeRoute");
app.use('/employee', employee_router);
app.use('/deparment', deparment_router);
// app.use('/deparment_employee', deparment_employee_router);
db.sequelize.sync();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} and url is  http://localhost:3003/`);
})