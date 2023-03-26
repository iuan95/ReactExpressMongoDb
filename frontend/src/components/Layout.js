// import  {Routes, Route, Link} from "react-router-dom";
import  {Outlet, NavLink} from "react-router-dom";
const setActive = ({isActive})=> isActive?'active-link': '';
const Layout = ()=>{
    // className={({isActive})=> isActive?'active-link': ''}

    return(
        <div>
            <header className={"header-header"}>
                <NavLink to={'/'} className={setActive}> Home</NavLink>
                <NavLink to={'/about'} className={setActive}> About</NavLink>
                <NavLink to={'/contacts'} className={setActive}> Contacts</NavLink>
                <NavLink to={'/posts'} className={setActive}> Posts</NavLink>
                <NavLink to={'/users'} className={setActive}> Users</NavLink>
                <NavLink to={'/conwqewqe'} className={setActive}> Error</NavLink>
            </header>
            <main>
                <Outlet/> {/*//Динамика барыта манна баар буолар*/}
            </main>
            <footer>Это Футер</footer>
        </div>
    )
}
export default Layout;