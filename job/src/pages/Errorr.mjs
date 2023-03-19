import Wrapper from '../assets/wrappers/ErrorPage.js'
import img from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'
 
const Errorr = () => {
    return <Wrapper className='full-page'>
        <div>
            <img src={img} alt='not found' />
            <h3>Page not found!!</h3>
            <p>We are not able to find the page</p>
            <Link to='/'>Home Page</Link>
        </div>

    
    </Wrapper>
}
export default Errorr