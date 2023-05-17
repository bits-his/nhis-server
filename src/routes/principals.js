const { principals, searchPrincipal } = require("../controllers/principals")

module.exports = (app) => {

    app.get(
        "/api/principals",
        principals
    );
    app.get(
        "/api/search-principal",
        searchPrincipal
    )
};

