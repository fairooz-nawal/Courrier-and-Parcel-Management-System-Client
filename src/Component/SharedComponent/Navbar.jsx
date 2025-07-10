import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const activeClass = 'btn btn-ghost btn-active'
    const inactiveClass = 'btn btn-ghost'

    // 🔗 Define all nav links here
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/track"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Track Parcel
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/book-parcel"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Book Parcel
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/customer-dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Customer Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/agent-dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Agent Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/admin-dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
                Admin Dashboard
            </NavLink>
        </li>

    </>

    // 🛑 Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8">
            <div className="navbar-start">
                {/* Mobile dropdown */}
                <div className="dropdown" ref={dropdownRef}>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    {dropdownOpen && (
                        <ul
                            id="mobile-menu"
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-2 shadow-lg"
                            onClick={() => setDropdownOpen(false)} // close menu on link click
                        >
                            {links}
                        </ul>
                    )}
                </div>

                {/* Brand / Logo */}
                <NavLink
                    to="/"
                    className="btn btn-ghost text-xl normal-case font-bold ml-2"
                >
                    CourierApp
                </NavLink>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* Navbar end */}
            <div className="navbar-end">
                <div className="flex flex-col md:flex-row lg:flex-row">
                    <NavLink to="/profile" className="btn">
                        Profile
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                    >
                        Register
                    </NavLink>

                </div>

            </div>
        </div>
    )
}
