import { React } from 'react'
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };


  return (
    <>
      
      <div className="sidebar">
        <h2>Ticket Management</h2>
        <ul>
            <li>
              <NavLink to="/" className="nav-link">
                  Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-ticket" className="nav-link">
                  Create Ticket
              </NavLink>
            </li>
            <li>
              <NavLink to="/ticket" className="nav-link">
                  Your Ticket
              </NavLink>
            </li>
        </ul> 
    </div>

    <div className="navbar">
      <ul className="nav-brand">
      {!auth.user ? (
        <>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
                Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </>
        ):(
        <>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              style={{ border: "none" }}
            >
              {auth?.user?.name}
            </NavLink>
          <ul className="dropdown-menu">
            <li>
              <NavLink
                onClick={handleLogout}
                to="/login"
                className="dropdown-item"
              >
                Logout
              </NavLink>
            </li>
          </ul>
          </li>
        </>
      )}
      </ul>
    </div>
    
            
    </>
  );
};

export default Sidebar;
