import React from 'react';

class Navbar extends React.Component {

    componentDidMount(){
        this.toggleNavbar();
    }

    toggleNavbar = () => {
        const ham = document.querySelector('.ham'),
            navbar = document.querySelector('.navbar'),
            lines = document.querySelectorAll('.line')
            
        if(window.innerWidth <= 550){
            navbar.style.display = 'none'
        }else{
            navbar.style.display = 'flex'
        }
        
        ham.addEventListener('click', () => {
            if((!navbar.style.display) ||
                (navbar.style.display === 'none')
            ){
                navbar.style.display = 'flex'
                lines.forEach(line => line.style.backgroundColor = '#fff');
                lines[1].style.display = 'none'
                lines[0].style.transform="rotate(45deg) translate(4px, 4px)"
                lines[2].style.transform="rotate(-45deg)"
            }else{
                navbar.style.display = 'none';
                lines.forEach(line => line.style.backgroundColor = '#000');
                lines[1].style.display = 'flex'
                lines[0].style.transform="rotate(180deg) translate(0,0)"
                lines[2].style.transform="rotate(180deg)"
                
            }
        })
        window.addEventListener('resize', () => {
            if(window.innerWidth > 550){
                navbar.style.display = 'flex'
            }else{
                navbar.style.display = 'none';
                lines.forEach(line => line.style.backgroundColor = '#000');
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