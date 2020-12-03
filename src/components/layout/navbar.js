import React from 'react';

class Navbar extends React.Component {

    componentDidMount(){
        const ham = document.querySelector('.ham'),
            navbar = document.querySelector('.navbar'),
            lines = document.querySelectorAll('.line')

        ham.addEventListener('click', () => {
            if((!navbar.style.display) ||
                (navbar.style.display === 'none')
            ){
                navbar.style.display = 'flex'
                lines.forEach(line => line.style.backgroundColor = '#fff')
            }else{
                navbar.style.display = 'none';
                lines.forEach(line => line.style.backgroundColor = '#000')
            }
        })
    }

    render() {

        return (
            <div className="navbar">
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">Link</a> 
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