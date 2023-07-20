import db from "../models";

const principals = (req, res) => {
  const { offset = "", limit = 10, search = "" } = req.body;
  db.sequelize
    .query("CALL principals(:search, :limit, :offset)", {
      replacements: {
        offset,
        limit,
        search,
      },
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
};

const enrolee = (req, res) => {
  // const {  } = req.body;
  const {
    nhia = null,
    program_type = null,
    surname = null,
    firstname = null,
    middlename = null,
    dob = null,
    gender = null,
    entity__tpye = null,
    hmo_code = null,
    hmo = null,
    email = null,
    martial_status = null,
    year_of_p = null,
    callup_no = null,
    state_code = null,
    services_year = null,
    services_batch = null,
    stream = null,
    state_of_origin = null,
    state_of_p = null,
    start_date = null,
    end_date = null,
    zone = null,
    zone_id = null,
    state_of_c = (nul = null),
  } = req.body;
  const { query_type = "insert" } = req.query;
  db.sequelize
    .query(
      `call enrolee(:nhia,:query_type,:program_type,:surname,:firstname,:middlename,:dob,:gender,:entity__tpye,:hmo_code,:hmo,:email,:martial_status,:year_of_p,:callup_no,:state_code,:services_year,:services_batch,:stream,:state_of_origin,:state_of_p,:start_date,:end_date,:zone,:zone_id,:state_of_c)`,
      {
        replacements: {
          nhia,
          query_type,
          program_type,
          surname,
          firstname,
          middlename,
          dob,
          gender,
          entity__tpye,
          hmo_code,
          hmo,
          email,
          martial_status,
          year_of_p,
          callup_no,
          state_code,
          services_year,
          services_batch,
          stream,
          state_of_origin,
          state_of_p,
          start_date,
          end_date,
          zone,
          zone_id,
          state_of_c,
        },
      }
    )
    .then((results) => res.json({ success: true, results }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
};

const insertExcel = (req, res) => {
  const excelData = req.body;
  console.log(excelData);
  // Store the received Excel data in the database
  const sql = `INSERT INTO enrollee (Nhia,ProgramType,Surname,FirstName,MiddleName,DateOfBirth,Gender,
        EntityType,HmoCode,Hmo,Email,MaritalStatus,YearOfP,CallupNo,StateCode,ServiceYear,
        ServiceBatch,Stream,StateOfOrigin,StateOfP,StartDate,EndDate,Zone,ZoneId,StateOfC) 
        VALUES ${excelData.map(
          (
            row
          ) => `("${row.NHIA}", "${row["Program Type"]}", "${row.Surname}", "${row["First Name"]}", "${row["Middle Name"]}", 
            "${row.DOB}", "${row.Gender}", "${row["Entity Type"]}", "${row["HMO Code"]}", "${row.Hmo}", "${row.Email}", 
            "${row["Marital Status"]}", "${row.year_of_posting}", "${row.callup_number}", "${row.statecode}", "${row.service_year}", 
            "${row.service_batch}", "${row.stream}", "${row.state_origin}", "${row.state_of_posting}", "${row.start_date}", 
            "${row.end_date}", "${row.Zone}", "${row.Zone_id}", "${row.state_of_camping}")`
        )}`;
  db.sequelize
    .query(sql)
    .then((results) =>
      res.json({ success: true, message: "Submitted successfully" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
};

export { principals, enrolee, insertExcel };
