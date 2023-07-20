const {
  principals,
  enrolee,
  insertExcel,
  selectByID,
} = require("../controllers/principals");

module.exports = (app) => {
  app.post("/api/principals", principals);
  app.post("/api/enrolee", enrolee);
  app.post("/api/insertExcel", insertExcel);
  app.get("/api/select_erollee", selectByID);
};
