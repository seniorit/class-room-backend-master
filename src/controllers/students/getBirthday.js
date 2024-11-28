const StudentsServices = require("../../services/students");
const pick = require("../../utils/pick");

module.exports = async (req, res) => {
    const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
    const studentsResults = await StudentsServices.getBirthdayByMonth(options);

    res.json({
      studentsResults,
    });
}