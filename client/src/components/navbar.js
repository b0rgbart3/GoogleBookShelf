import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";


function Navbar() {
  const location = useLocation();

  return (

  <div className="gNavBar group">
    <Link to="/"><div className='logo'>My Google Book Shelf</div></Link>
    <ul className="navlinks group">

    {/* to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"} */}
    <Link to="/" className={location.pathname === "/" ? "navLinker navActive" : "navLinker"} >
      <li> Find Books</li></Link>
    <Link to="/saved" className={location.pathname === "/saved" ? "navLinker navActive" : "navLinker"}>
      <li>View My Colleciton</li></Link>
 


    </ul>
  </div>

  );
}

export default Navbar;
