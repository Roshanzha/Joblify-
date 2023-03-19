import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import Logo from "./Logo.mjs";
import links from "../util/links.js";
import { NavLink } from 'react-router-dom'
import { useAppContext } from "../context/appContext.mjs"; 
import NavLinks from "./NavLinks.js";

const SmallSidebar = () => {
    const {showSidebar,toggleSidebar}=useAppContext()
    return <Wrapper>
        <div className=
            {showSidebar ? "sidebar-container show-sidebar" : 'sidebar-container'}>
             <div className="content">
                <button className="close-btn" onClick={toggleSidebar }>
                <FaTimes/>
                </button>
                <header>
                <Logo/>
                </header>
               <NavLinks toggleSidebar={toggleSidebar}/>
            </div>
        
        </div>     
    </Wrapper>
}
export default SmallSidebar