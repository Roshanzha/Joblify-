import Wrapper from "../assets/wrappers/BigSidebar.js";
import { useAppContext } from "../context/appContext.mjs";
import Logo from "./Logo.mjs";
import NavLinks from "./NavLinks.js";

const BigSidebar = () => {
const {showSidebar,toggleSidebar}=useAppContext()
    return <Wrapper>
        <div className={
            showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }>
            <div className="content">
                <header>
                <Logo/>
                </header>
                <NavLinks toggleSidebar={toggleSidebar}/>
            </div>
        </div>
    </Wrapper>
}
export default BigSidebar