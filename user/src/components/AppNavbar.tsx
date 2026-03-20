import { Link, useNavigate } from "react-router-dom"
import { fetchCurrentUser, logoutUser } from "../api/authApi"
import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import type { User } from "../types/user"

// Lucide icons
import {
  LayoutDashboard,
  Tags,
  ShoppingCart,
  ChevronDown,
  LogOut,
  PackageSearch
} from "lucide-react"

const AppNavbar = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await fetchCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error(err)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    setLoading(true)

    if (!confirm("Are you sure to logout?")) {
      setLoading(false)
      return
    }

    try {
      await logoutUser()
      queryClient.clear()
      navigate("/")
    } catch (err) {
      console.error("Logout failed", err)
    } finally {
      setLoading(false)
    }
  }

  const navLinkClass =
    "flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition"

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center gap-8">
              <Link to="/dashboard" className={navLinkClass}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link to="/menus" className={navLinkClass}>
                <PackageSearch size={18} />
                Menus
              </Link>

              <Link to="/sales" className={navLinkClass}>
                <ShoppingCart size={18} />
                Sales
              </Link>

              
              <Link to="/categories" className={navLinkClass}>
                <Tags size={18} />
                Category
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                {user?.name || "User"}
                <ChevronDown size={16} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar