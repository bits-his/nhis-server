const { principals } = require("../controllers/principals")

module.exports = (app) => {

    app.get(
        "/api/principals",
        principals
    );
};
