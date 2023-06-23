const db = require("../db/index");
const employee = db.employee;
const deparment = db.deparment;
const deparment_employee = db.deparment_employee;
const ApiError = require("../apiError");
const _ = require("lodash");
const { where } = require("sequelize");

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
    console.log("create deparment");
    try {
        const Body = req.body;
        const Code = Body.Code || '';
        const Name = Body.Name || '';
        if(Code === ''){
            return next(new ApiError(500, "Code is require"));
        }
        if(Name === ''){
            return next(new ApiError(500, "Name is require"));
        }
        const data = {
            Name: Name,
            Code: Code
        };
        await deparment.create(data);
        res.json({
            Mess: "create new deparment success",
            Data: '',
          });
    } catch (error) {
        console.log(error); 
    }
};

// Retrieve all Tutorials from the database.
exports.GetAll = async(req, res, next) => {
    console.log("GetAll deparment");
  try {
    const deparmentInfo = await deparment.findAll();
    console.log(deparmentInfo);
      res.json({
        Mess: "success",
        Data: deparmentInfo,
      });
  } catch (error) {
    console.log(error);
  }

};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
    console.log("findOne deparment");
    try {
      const id = req.params.id;
      const deparmentInfo = await deparment.findByPk(id);
      if (_.isNil(deparmentInfo)) {
        return next(new ApiError(404, "Deparment is not exist"));
      }
      res.json({
        Mess: "success",
        Data: deparmentInfo,
      });
    } catch (error) {
      console.log(error);
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  console.log('update deparment');
    try {
        const id = req.params.id;
        const Body = req.body;
        const Name = Body.Name || "";
        const Code = Body.Code || "";
        let query = {};
        const deparmentInfo = await deparment.findByPk(id);
        if(_.isNil(deparmentInfo)){
            return next(new ApiError(404, "Deparment is not exist"));
        }
        if (Name !== "") {
            query = Object.assign({ Name: Name }, query);
        }
        if (Code !== "") {
            const checkCode = await deparment.findOne({
              where: {
                Code: Code
              }
            });
            if(!_.isNil(checkCode)){
              return next(new ApiError(404, "Code Deparment is exist"));
            }
            query = Object.assign({ Code: Code }, query);
        }
        
        await deparment.update(query, {
            where: {
              ID: id
            }
          });
       
        res.json({
            Mess: "update deparment success",
            Data: '',
          });
    } catch (error) {
        console.log(error);
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
    console.log("delete deparment");
    try {
      const id = req.params.id;
      const deparmentInfo = await deparment.findByPk(id);
      if (_.isNil(deparmentInfo)) {
        return next(new ApiError(404, "Deparment is not exist"));
      }
      const deparment_employeeInfo = deparment_employee.findOne({
        where:{
            deparment_id: id
        }
      });
      if (_.isNil(deparment_employeeInfo)) {
        return next(new ApiError(404, "deparment_employeeInfo is not exist"));
      }
      await deparment_employee.update({deparment_id: null}, {
        where: {
            deparment_id: id
        }
      });
      await deparment.destroy({
        where:{
        ID: id
      }});
      res.json({
        Mess: "delete deparment success",
        Data: '',
      });
    } catch (error) {
      console.log(error);
    }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
  console.log('deleteAll deparment');
    try {
        let listIDs = await deparment_employee.findAll({
          attributes : ['ID'],
        });
        console.log(listIDs);
        listIDs = listIDs.map(x => x.ID);
        await deparment_employee.update({ deparment_id : null },{ where : { id : listIDs }}); 
        await deparment.destroy({ truncate: { cascade: true } });
        
        res.json({
            Mess: "delete all deparment success",
            Data: '',
          });
    } catch (error) {
        console.log(error);
    }
};

