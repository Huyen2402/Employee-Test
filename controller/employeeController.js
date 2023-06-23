const db = require("../db/index");
const employee = db.employee;
const deparment = db.deparment;
const deparment_employee = db.deparment_employee;
const ApiError = require("../apiError");
const _ = require("lodash");

exports.create = async (req, res, next) => {
  console.log("create employee");
  try {
    const Body = req.body;
    const Name = Body.Name || "";
    const Phone = Body.Phone || "";
    const Sex = Body.Sex || "";
    const Avt = Body.Avt || "";
    let Code = Body.Code || "";
    const deparment_id = Body.deparment_id || "";
    if (Name === "") {
      return next(new ApiError(500, "Name is require"));
    }
    if (Phone === "") {
      return next(new ApiError(500, "Phone is require"));
    }
    if (Sex === "") {
      return next(new ApiError(500, "Sex is require"));
    }
    if (Avt === "") {
      return next(new ApiError(500, "Avt is require"));
    }
    if (Code === "") {
      const employeeLastest = await employee.findOne({
        order: [["createdAt", "DESC"]],
      });
      if (_.isNil(employeeLastest)) {
        Code = "00001-Emp";
      }
      else{
        const codeEmployee = employeeLastest.Code;
        const numberCode = parseInt(codeEmployee);
        Code = codeEmployee.replace(
          numberCode.toString(),
          (numberCode + 1).toString()
        );
      }
      
    }
    if (deparment_id === "") {
      return next(new ApiError(500, "DeparmentID is require"));
    }
    const deparmentInfo = deparment.findByPk(deparment_id);
    if(_.isNil(deparmentInfo)){

    }
    const dataEmployee = {
      Name: Name,
      Phone: Phone,
      Sex: Sex,
      Avt: Avt,
      Code: Code,
    };
    const newEmployee = await employee.create(dataEmployee);
    await deparment_employee.create({
      deparment_id: deparment_id,
      employee_id: newEmployee.ID,
    });
    res.json({
      Mess: "create success",
      Data: "",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetAll = async (req, res, next) => {
  console.log("GetAll employee");
  try {
    const employeeInfo = await employee.findAll();
    console.log(employeeInfo);
    const data = employeeInfo.map((e) =>{
        return {
            ID: e.ID,
            Code: e.Code,
            Name: e.Name,
            Phone: e.Phone,
            Sex: e.Sex === true ? "Nữ" : "Nam",
            Avt: e.Avt,
          }
    });
    
      res.json({
        Mess: "success",
        Data: data,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.findOne = async (req, res, next) => {
  console.log("findOne employee");
  try {
    const id = req.params.id;
    const employeeInfo = await employee.findByPk(id);
    if (_.isNil(employeeInfo)) {
      return next(new ApiError(404, "Employee is not exist"));
    }
    const data = {
      ID: employeeInfo.ID,
      Code: employeeInfo.Code,
      Name: employeeInfo.Name,
      Phone: employeeInfo.Phone,
      Sex: employeeInfo.Sex === true ? "Nữ" : "Nam",
      Avt: employeeInfo.Avt,
    };
    res.json({
      Mess: "success",
      Data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, next) => {
    console.log('update employee');
    try {
        const id = req.params.id;
        const Body = req.body;
        const Name = Body.Name || "";
        const Phone = Body.Phone || "";
        const Sex = Body.Sex || "";
        const Avt = Body.Avt || "";
        let query = {};
        const deparment_id = Body.deparment_id || "";
        const employeeInfo = await employee.findByPk(id);
        if(_.isNil(employeeInfo)){
            return next(new ApiError(404, "Employee is not exist"));
        }
        if (Name !== "") {
            query = Object.assign({ Name: Name }, query);
        }
        if (Phone !== "") {
            query = Object.assign({ Phone: Phone }, query);
        }
        if (Sex !== "") {
            query = Object.assign({ Sex: Sex }, query);
        }
        if (Avt !== "") {
            query = Object.assign({ Avt: Avt }, query);
        }
        if (deparment_id !== "") {
            const deparmentInfo = deparment.findOne({where: {
                employee_id: id
            }});
            if(_.isNil(deparmentInfo)){
                return next(new ApiError(404, "Deparment is not exist"));
            }
            else{
                await deparment_employee.update({deparment_id: deparment_id}, {
                    where: {
                        employee_id: id
                    }
                });
            }
        }
        
        await employee.update(query, {
            where: {
              ID: id
            }
          });
       
        res.json({
            Mess: "update employee success",
            Data: '',
          });
    } catch (error) {
        console.log(error);
    }
};

exports.delete = async (req, res, next) => {
    console.log("delete one employee");
    try {
      const id = req.params.id;
      const employeeInfo = await employee.findByPk(id);
      if (_.isNil(employeeInfo)) {
        return next(new ApiError(404, "Employee is not exist"));
      }
      await deparment_employee.destroy({
        where: {
          employee_id: id
        }
      });
      await employee.destroy({
        where: {
          ID: id
        }
      });
      res.json({
        Mess: "delete employee success",
        Data: '',
      });
    } catch (error) {
      console.log(error);
    }
};

exports.deleteAll = async (req, res, next) => {
    console.log('deleteAll employee');
    try {
        await deparment_employee.destroy({
            where: {},
            truncate: true
        });
        await employee.destroy({ truncate: { cascade: true } });
        
        res.json({
            Mess: "delete all employee success",
            Data: '',
          });
    } catch (error) {
        console.log(error);
    }
};
