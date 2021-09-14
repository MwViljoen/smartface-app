import React from 'react';
import './NavigationStyles.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav className='navigation-bar'>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signIn')}>
                    Sign Out
                </p>
            </nav>
        );
    } else {
        return (
            <nav className='navigation-bar'>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signIn')}>
                    Sign In
                </p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>
                    Register
                </p>
            </nav>
        )
    }
}

export default Navigation;