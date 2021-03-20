import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="header container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="header-title ">
                    <h1>Go With Us</h1>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <ul className="header-nav">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/destination'>Destination</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li>{loggedInUser.email ? loggedInUser.name : <Link to='/login'>Login</Link>}</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;