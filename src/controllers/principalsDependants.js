import db from "../models";

const principalsDependants = (req, res) => {
    const { id } = req.query
    db.sequelize
        .query("CALL Principals_dependants(:id)", {
            replacements: { id }
        })
        .then((results) => res.json({ success: true, results }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false });
        });
};

export { principalsDependants };
