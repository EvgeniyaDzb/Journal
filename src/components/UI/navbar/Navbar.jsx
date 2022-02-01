import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/context";
import style from "./Navbar.module.css"

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  return (
    <div className={style.navbar}>
      <div className={style.links}>
        <ul>
          <li>
            <Link to='/posts' className={splitLocation[1] === "posts" ? style.active : ""}>
              Posts
            </Link>
          </li>
          <li>
            <Link to='/albums' className={splitLocation[1] === "albums" ? style.active : ""}>
              Albums
            </Link>
          </li>
          <li> {isAuth && <a onClick={logout}>Log out</a>}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;