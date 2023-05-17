import db from "../models";

const principals = (req, res) => {
    db.sequelize
        .query("CALL principals()")
        .then((results) => res.json({ success: true, results }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false });
        });
};

const searchPrincipal = (req, res) => {
    const {name} = req.query
    db.sequelize
        .query("CALL search_principal(:name)", {
            replacements:{name:`%${name}%`}
        })
        .then((results) => res.json({ success: true, results }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false });
        });
};

export { principals, searchPrincipal };
