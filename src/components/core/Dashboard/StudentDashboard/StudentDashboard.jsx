import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI"

const safeProgress = (value) => {
  const number = Number(value || 0)
  if (Number.isNaN(number)) return 0
  return Math.max(0, Math.min(100, Math.round(number)))
}

const getContinueRoute = (course) => {
  const firstSection = course?.courseContent?.[0]
  const firstSubSection = firstSection?.subSection?.[0]

  if (!course?._id || !firstSection?._id || !firstSubSection?._id) {
    return "/dashboard/enrolled-courses"
  }

  return `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [loading, setLoading] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      const courses = await getUserEnrolledCourses(token)
      setEnrolledCourses(courses || [])
      setLoading(false)
    }

    loadDashboardData()
  }, [token])

  const dashboardStats = useMemo(() => {
    const totalCourses = enrolledCourses.length
    const completedCourses = enrolledCourses.filter(
      (course) => safeProgress(course.progressPercentage) >= 100
    ).length

    const totalProgress = enrolledCourses.reduce(
      (acc, course) => acc + safeProgress(course.progressPercentage),
      0
    )

    const averageProgress =
      totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0

    return {
      totalCourses,
      completedCourses,
      averageProgress,
      inProgressCourses: Math.max(totalCourses - completedCourses, 0),
    }
  }, [enrolledCourses])

  const recentCourses = enrolledCourses.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-richblack-700 bg-gradient-to-r from-richblack-800 via-richblack-800 to-blue-700/30 p-6 md:p-8">
        <p className="text-sm font-medium text-richblack-200">Welcome back</p>
        <h1 className="mt-2 text-2xl font-semibold text-richblack-5 md:text-4xl">
          {user?.firstName}, your learning cockpit is ready
        </h1>
        <p className="mt-3 max-w-2xl text-richblack-100">
          Track progress, jump back to your latest lessons, and keep momentum
          every day.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-sm text-richblack-200">Enrolled Courses</p>
          <p className="mt-2 text-3xl font-semibold text-richblack-5">
            {dashboardStats.totalCourses}
          </p>
        </article>
        <article className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-sm text-richblack-200">Average Progress</p>
          <p className="mt-2 text-3xl font-semibold text-yellow-50">
            {dashboardStats.averageProgress}%
          </p>
        </article>
        <article className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-sm text-richblack-200">Completed Courses</p>
          <p className="mt-2 text-3xl font-semibold text-caribbeangreen-100">
            {dashboardStats.completedCourses}
          </p>
        </article>
        <article className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-sm text-richblack-200">Cart Items</p>
          <p className="mt-2 text-3xl font-semibold text-blue-25">{totalItems}</p>
        </article>
      </section>

      <section className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-richblack-5">Continue Learning</h2>
          <Link
            to="/dashboard/enrolled-courses"
            className="text-sm font-medium text-yellow-50 hover:underline"
          >
            View all courses
          </Link>
        </div>

        {loading ? (
          <div className="my-8 grid place-items-center">
            <div className="spinner"></div>
          </div>
        ) : recentCourses.length === 0 ? (
          <div className="mt-6 rounded-lg border border-richblack-700 bg-richblack-900 p-5 text-richblack-200">
            No enrolled courses yet. Start with a category and enroll in your first course.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {recentCourses.map((course) => (
              <article
                key={course._id}
                className="group rounded-xl border border-richblack-700 bg-richblack-900 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-yellow-100/40"
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-36 w-full rounded-lg object-cover"
                />
                <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-richblack-5">
                  {course.courseName}
                </h3>
                <p className="mt-1 text-sm text-richblack-200">
                  Progress: {safeProgress(course.progressPercentage)}%
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-richblack-700">
                  <div
                    className="h-full rounded-full bg-yellow-50 transition-all duration-500"
                    style={{ width: `${safeProgress(course.progressPercentage)}%` }}
                  />
                </div>
                <button
                  onClick={() => navigate(getContinueRoute(course))}
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900"
                >
                  Continue
                  <FaArrowRight />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
