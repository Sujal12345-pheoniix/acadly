import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
      <Sidebar />
      <div className="relative h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-20 right-10 h-52 w-52 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-caribbeangreen-100 blur-3xl" />
        </div>
        <div className="relative mx-auto w-11/12 max-w-[1100px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard