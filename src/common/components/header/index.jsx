import React from 'react'
import styles from "./style.module.css"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROFILE } from 'features/authentication/action';
function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);

  const goToHome = () => {
    history.push("/")
  }

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });
    goToHome()
  }

  const renderUserInfo = () => {
    if (userProfile)
      return (
        <>
          <NavLink to='/signin' activeClassName={styles.active}>
            Xin Chao, {userProfile.hoTen}
          </NavLink>
          <a href='#' onClick={handleLogOut}>Log out</a>
        </>
      );

    return (
      <>
        <NavLink to='/signin' activeClassName={styles.active}>
          Sign in
        </NavLink>
        <NavLink to='/signup' activeClassName={styles.active}>
          Sign up
        </NavLink>
      </>
    );
  }

  return (
    <div className={styles.header}>
      <span onClick={goToHome} href='#' className={styles.logo}>Cyber Movie</span>
      <nav className={styles.navbar}>
        <NavLink to='/' activeClassName={styles.active} exact>
          Home
        </NavLink>
        <NavLink to='/movies' activeClassName={styles.active}>
          Movies
        </NavLink>

        {renderUserInfo()}
      </nav>
    </div>
  )
}

export default Header