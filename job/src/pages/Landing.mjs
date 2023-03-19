import { useNavigate } from 'react-router';
import styled from 'styled-components'
import main from '../assets/images/main.svg'
import Logo from '../components/Logo.mjs'

const Landing = () => {
    const history =useNavigate();
  
    const coursesPage = () => {
        history("/register")
    }
    return (<Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                
                <h1>
                Job <span>tracking</span> app
                </h1>
                <p>
                    I'm baby 8-bit blue bottle ennui poutine mumblecore trust fund direct trade yr chia palo santo craft beer lyft. Shoreditch salvia cred flannel woke. Kale chips godard thundercats gatekeep marfa, kinfolk blog tattooed next level paleo yes plz glossier before they sold out succulents. Pickled brunch neutra, kickstarter portland truffaut tbh. Semiotics godard mumblecore raclette bitters hot chicken, slow-carb narwhal sartorial kinfolk cold-pressed. Readymade actually jean shorts knausgaard vibecession bespoke
                </p>
                <button className='btn btn-hero'   onClick={coursesPage}>Login/Register</button>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
        
        </div>
    </Wrapper>)
}
const Wrapper = styled.main`
nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
}
.page{
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top:6rem;

}
h1{
    font-weight: 700;
    span{
        color: var(--primary-500)
    }
    p{
        color: var( --grey-600);
    }
    .main-img{
        display: none;
    }
    @media (min-width: 992px) {
        .page{
            grid-template-columns:1fr fr;
            column-gap: 3rem;
        }
        .main-img{
            display: block;
        }
    }
}
`
export default Landing
