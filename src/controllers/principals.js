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

const selectByID = (req, res) => {
  const { id } = req.query;
  db.sequelize
    .query("CALL select_enrollee(:id)", {
      replacements: { id },
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
};

const enrolee = (req, res) => {
  const { query_type = "insert" } = req.query;
  req.body.forEach((item) => {
    db.sequelize
      .query(
        `call enrolee(:nhia,:query_type,:program_type,:surname,:firstname,:middlename,:dob,:gender,:entity__tpye,:hmo_code,:hmo,:email,:martial_status,:year_of_p,:callup_no,:state_code,:services_year,:services_batch,:stream,:state_of_origin,:state_of_p,:start_date,:end_date,:zone,:zone_id,:state_of_c)`,
        {
          replacements: {
            nhia: item.nhia ? item.nhia : "",
            query_type: query_type,
            program_type: item.program_type ? item.program_type : "",
            surname: item.surname ? item.surname : "",
            firstname: item.firstname ? item.firstname : "",
            middlename: item.middlename ? item.middlename : "",
            dob: item.dob ? item.dob : "",
            gender: item.gender ? item.gender : "",
            entity__tpye: item.entity__tpye ? item.entity__tpye : "",
            hmo_code: item.hmo_code ? item.hmo_code : "",
            hmo: item.hmo ? item.hmo : "",
            email: item.email ? item.email : "",
            martial_status: item.martial_status ? item.martial_status : "",
            year_of_p: item.year_of_p ? item.year_of_p : "",
            callup_no: item.callup_no ? item.callup_no : "",
            state_code: item.state_code ? item.state_code : "",
            services_year: item.services_year ? item.services_year : "",
            services_batch: item.services_batch ? item.services_batch : "",
            stream: item.stream ? item.stream : "",
            state_of_origin: item.state_of_origin ? item.state_of_origin : "",
            state_of_p: item.state_of_p ? item.state_of_p : "",
            start_date: item.start_date ? item.start_date : "",
            end_date: item.end_date ? item.end_date : "",
            zone: item.zone ? item.zone : "",
            zone_id: item.zone_id ? item.zone_id : "",
            state_of_c: item.state_of_c ? item.state_of_c : "",
          },
        }
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, err });
      });
  });
  res.json({ success: true });
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

export { principals, enrolee, insertExcel, selectByID };
