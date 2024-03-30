import { NavLink } from "react-router-dom"
import styles from './Navbar.module.css'
import { useSelector } from "react-redux";
import {Logout} from "../../API/internel";
import { useDispatch } from "react-redux";
import { resetUser } from "../../Store/userSlice";

function Navbar() 
{
    const dispatch = useDispatch();
    let isAuthenticated = useSelector(state => state.user.auth);
    async function HandleSignOut()
    {
        Logout();
        dispatch(resetUser());
        
    }
    return (
        <>
        <div>
            <nav className={styles.navbar}>
                <NavLink to={"/"} className={styles.icon}>BlogBounce</NavLink>
                <NavLink to={"/home"} className={styles.navbaritems}>Home</NavLink>
                <NavLink to={"/blogs"} className={styles.navbaritems}>Blogs</NavLink>
                <NavLink to={"/News"} className={styles.navbaritems}>News</NavLink>
                {isAuthenticated ? (<NavLink to={"/"} className={styles.navbaritems} onClick={HandleSignOut}>Log Out</NavLink>) : (<><NavLink to={"/login"} className={styles.navbaritems}>Login</NavLink>
                <NavLink to={"/signup"} className={styles.navbaritems}>Sign Up</NavLink></>)}
            </nav>
        </div>
        <div className={styles.line}></div>
        </>
    )

}

export default Navbar;