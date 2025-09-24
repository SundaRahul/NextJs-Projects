const Student = require('./models/Student');
const Profile = require('./models/Profile');
const Teacher = require('./models/Teacher');
const Course = require('./models/Course');

const Enrollment = require('./models/Enrollment');

const getCoursesOfStudent = async (studentId) => {
  const enrollments = await Enrollment.find({ studentId }).populate('courseId').select('courseId').lean();
  const courses = enrollments.map(e => e.courseId);
  console.log(courses);
};



const getTeacherWithCourses = async (teacherId) => {
  const teacher = await Teacher.findById(teacherId).lean();
  const courses = await Course.find({ teacherId }).lean();
  console.log({ ...teacher, courses });
};


const getStudentWithProfile = async (studentId) => {
  const profile = await Profile.findOne({ studentId }).populate('studentId').lean();
  console.log(profile);
};
