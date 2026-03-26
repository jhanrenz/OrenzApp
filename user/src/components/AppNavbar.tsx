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
  PackageSearch,
  Menu,
  X
} from "lucide-react"

const AppNavbar = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/menus", label: "Menus", icon: <PackageSearch size={18} /> },
    { to: "/sales", label: "Sales", icon: <ShoppingCart size={18} /> },
    { to: "/categories", label: "Category", icon: <Tags size={18} /> }
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo or brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              MyApp
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={navLinkClass}>
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                {user?.email || "User"}
                <ChevronDown size={16} />
              </button>

              {openDropdown && (
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-medium transition rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut size={16} />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AppNavbar