const httpStatus = require('http-status')
const { Student, UserProfile } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Query for students
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options)
  return students
}

/**
 * select all student
 */
const getAll = async (filter, options) => {
  const students = await Student.paginate(filter, options)
  return students
}

/**
 * Get student by id
 */
const getById = async id => {
  const student = await Student.findById(id)
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not avilable')
  }
  return student
}

/**
 * Get students by Guard id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getByGuardId = async id => {
  const student = await Student.find({ guard: id })
  const profile = await UserProfile.findOne({ user: id }).populate('user')
  return (responseStudent = {
    student,
    profile
  })
}

/**
 * Get students by Classification Id
 * * Populate Guard
 * * Populate Clasification
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getByClassificationId = async id => {
  try {
    // TODO We get the students by the ID of the classification
    const students = await Student.find({ classifications: id }).populate(
      'classifications'
    ) // We populate the classifications

    // TODO We get the profiles of the student's guard
    const profiles = await Promise.all(
      students.map(async student => {
        const profile = await UserProfile.findOne({
          user: student.guard
        }).populate('user')
        return profile
      })
    )

    // TODO Format the response
    const responseStudents = students.map(student => {
      const profile = profiles.find(profile =>
        profile.user._id.equals(student.guard)
      )
      return {
        id: student._id,
        guard: student.guard,
        firstName: student.firstName,
        lastName: student.lastName,
        fullName: `${student.firstName} ${student.lastName}`,
        birthday: student.birthday,
        note: student.note,
        gender: student.gender,
        picture: student.picture,
        classifications: student.classifications, // We include populated classifications
        guardProfile: profile
          ? {
              userId: profile.user._id,
              email: profile.user.email,
              firstname: profile.firstname,
              lastname: profile.lastname
            }
          : null
      }
    })
    return {
      students: responseStudents
    }
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found by Classification')
  }
}

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const create = async studentBody => {
  return Student.create(studentBody)
}

/**
 * Update student
 * @param {ObjectId} studentId
 * @param {Object} updateBody
 * @returns {Promise<Student>}
 */
const update = async (studentId, updateBody) => {
  console.log(updateBody)
  const student = await getById(studentId)
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  Object.assign(student, updateBody)
  await student.save()
  return student
}

/**
 * Delete student
 * @param {ObjectId} studentId
 * @returns {Promise<Student>}
 */
const destroy = async studentId => {
  const student = await getById(studentId)
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  await student.remove()
  return student
}

module.exports = {
  queryStudents,
  getAll,
  getById,
  getByGuardId,
  getByClassificationId,
  create,
  update,
  destroy
}
