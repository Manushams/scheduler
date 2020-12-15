import React from 'react';

class Navbar extends React.Component {

    componentDidMount(){
        this.toggleNavbar();
        this.toggleTimeScale()
    }

    toggleNavbar = () => {
        const ham = document.querySelector('.ham'),
            navbar = document.querySelector('.navbar'),
            lines = document.querySelectorAll('.line'),
            ul = document.querySelector('.top-bar').querySelector('ul');
            
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
                ul.style.display = 'unset'            
                ul.style.opacity = '1';
                ul.style.transform = 'unset'
            }else{
                navbar.style.display = 'none';
                lines.forEach(line => line.style.backgroundColor = '#000');
                ul.style.display = 'none';
                lines[1].style.display = 'flex'
                lines[0].style.transform="rotate(180deg) translate(0,0)"
                lines[2].style.transform="rotate(180deg)"            
            }
        })
    }


    toggleTimeScale = () => {
        const dots = document.querySelector('.three-dots'),
            ul = document.querySelector('.top-bar').querySelector('ul');
        let isShown = false

        dots.addEventListener('click', () => {
            if((!ul.style.display) ||
            (ul.style.display === 'none')){
                ul.style.display = 'flex';
                setTimeout(() => {
                    dots.style.transform = 'perspective(10rem) translateZ(2rem)';
                    ul.style.opacity = '1';
                    ul.style.transform = 'translateY(.5rem)'                   
                    isShown = true                
                }, 100);
            }else{
                dots.style.transform = 'perspective(10rem) translateZ(0rem)';
                ul.style.display = 'none';
                ul.style.opacity = '0';
                ul.style.transform = 'translateY(-3rem)'
                isShown = false             
            }   
        })

        
        document.addEventListener('click', () => {
            if(isShown)ul.style.display = 'none';     
            dots.style.transform = 'perspective(10rem) translateZ(0rem)';
            isShown = false      
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