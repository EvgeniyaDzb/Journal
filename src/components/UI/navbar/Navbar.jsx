import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css"

const Navbar = () => {
    return(
    <div className={style.navbar}>
        <div className={style.navbar__links}>
          <Link to='/about'>About</Link>
          <Link to='/posts'>Posts</Link>
        </div>
      </div>
    );
};

export default Navbar;