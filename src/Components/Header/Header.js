import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css'
import blackLogo from '../../travel-guru-resource/Logo.png';
import whiteLogo from '../../travel-guru-resource/Logo2.png'
import { Link,  useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [currentState, setCurrentState] = useState('');
    useEffect(()=>{
        setCurrentState(window.location.pathname);
    },[useParams()]);

    let customClassName = 'navForOther';

    if(currentState === '/'){
        customClassName='navForHome'
        }

    return (
        <div className='container header'>
            <Navbar>
                <Link to='/'>
                    <Navbar.Brand>
                        {
                            (currentState === '/') ? <img className='travel_logo' src={whiteLogo} alt='home' />
                            : <img className='travel_logo' src={blackLogo} alt='home' />
                        }
                    </Navbar.Brand>
                </Link>
                <input type="text" className="form-control search_input" placeholder="Search your Destination..." />
                <Navbar.Toggle />
                <Navbar.Collapse className="nav_link justify-content-end">
                    <Link  className={customClassName} to='#'>News</Link>
                    <Link className={customClassName} to='#'>Destination</Link>
                    <Link className={customClassName} to='#'>Blog</Link>
                    <Link className={customClassName} to='#'>Contact</Link>
                    {
                        loggedInUser.isSignIn && <Link id='name' className={customClassName}>{loggedInUser.fullName}</Link>
                    }
                    {
                        loggedInUser.isSignIn ? 
                        <Link id='login_btn' className={customClassName} onClick={() => setLoggedInUser({isSignIn:false})}>Logout</Link>:
                        <Link id='login_btn' className={customClassName} to='/login'>Login</Link>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;