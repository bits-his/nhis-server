const { principalsDependants } = require("../controllers/principalsDependants")

module.exports = (app) => {

    app.get(
        "/api/principalsDependants",
        principalsDependants
    );
};
