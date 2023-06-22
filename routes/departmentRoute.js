const deparment_router = require("express").Router();
const deparmentController = require("../controller/departmentController");

deparment_router.get('/', deparmentController.GetAll);
deparment_router.post('/create', deparmentController.create);
deparment_router.get('/findOne/:id', deparmentController.findOne);
deparment_router.delete('/deleteOne/:id', deparmentController.delete);
deparment_router.put('/update/:id', deparmentController.update);
deparment_router.delete('/deleteAll', deparmentController.deleteAll);
module.exports = deparment_router;