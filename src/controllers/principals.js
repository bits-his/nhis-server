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

export { principals };
