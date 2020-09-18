import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";


function Navbar() {
  const location = useLocation();

  return (

  <div className="gNavBar group">
    <Link to="/"><div className='logo'>My Google Books</div></Link>
    <ul className="navlinks group">

    {/* to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"} */}
    <Link to="/saved" className={location.pathname === "/saved" ? "nav-link active" : "nav-link"}>
      <li className="navLinker">Saved</li></Link>
    <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"} >
      <li className="navLinker"> Search</li></Link>


    </ul>
  </div>

  );
}

export default Navbar;
