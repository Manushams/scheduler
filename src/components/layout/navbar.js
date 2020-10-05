import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">Dashboard</a> 
                        {/* Dashboard */}
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">link</a>
                        {/* Add Item/Event */}
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">link</a>
                        {/* Agenda */}
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">link</a>
                        {/* Timetable */}
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">link</a>
                        {/* Log Out */}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar