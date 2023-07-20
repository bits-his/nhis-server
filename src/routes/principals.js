const {
  principals,
  enrolee,
  insertExcel,
} = require("../controllers/principals");

module.exports = (app) => {
  app.post("/api/principals", principals);
  app.post("/api/enrolee", enrolee);
  app.post("/api/insertExcel", insertExcel);
};
