import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component{
    render(){
        return (
            <>
                <h1>Noteful</h1>
                <Link to={'/'}>
                    Main page
                </Link>
            </>
        );
    }
}

export default Header;