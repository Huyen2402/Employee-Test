const employee_router = require("express").Router();
const employeeController = require("../controller/employeeController");

employee_router.get('/', employeeController.GetAll);
employee_router.post('/create', employeeController.create);
employee_router.get('/findOne/:id', employeeController.findOne);
employee_router.delete('/deleteOne/:id', employeeController.delete);
employee_router.put('/update/:id', employeeController.update);
employee_router.delete('/deleteAll', employeeController.deleteAll);
module.exports = employee_router;