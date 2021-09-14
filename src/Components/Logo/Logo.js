import React from 'react';
import './LogoStyles.css';
import Tilt from "react-tilt/dist/tilt";
import logo from './face-detection.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2"
                  options={{max: 55, reverse: true, speed: 700, reset: false}}
                  style={{height: 150, width: 150}}
            >
                <div className="Tilt-inner">
                    <img src={logo} className="logo-img" alt=''/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;