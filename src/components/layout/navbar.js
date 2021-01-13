import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../../store/actions/authAction';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class Navbar extends React.Component {

    componentDidMount(){
        this.toggleNavbar();
        this.toggleTimeScale(); 
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
                lines.forEach(line => {
                    line.style.backgroundColor = '#fff'   
                });
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
            if((window.innerWidth > 550) 
            ){
                navbar.style.display = 'flex'
            }else{
                navbar.style.display = 'none';
                lines.forEach(line => line.style.backgroundColor = '#000');
                ul.classList.remove('show')
                lines[1].style.display = 'flex'
                lines[0].style.transform="rotate(180deg) translate(0,0)"
                lines[2].style.transform="rotate(180deg)"            
            }
        })
    }
   

    toggleTimeScale = () => {
        const dots = document.querySelector('.three-dots'),
            ul = document.querySelector('.timescale')
        let isShown = false


        dots.addEventListener('click', () => {
            console.log(ul)
            if(!isShown){
                dots.style.transform = 'perspective(10rem) translateZ(2rem)';
                setTimeout(() => {
                    isShown = true                                    
                }, 100);
            }else{
                dots.style.transform = 'perspective(10rem) translateZ(0rem)';
                isShown = false             
            }   
            ul.classList.toggle('show')
        })
        
        document.addEventListener('click', () => {
            if(isShown)ul.classList.remove('show');     
            dots.style.transform = 'perspective(10rem) translateZ(0rem)';
            isShown = false      
        })    
    }

    render() {

        const loggedInLinks = () => {
            return(
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
                        <a 
                            href="#!" 
                            className="nav-link"
                            onClick = {this.props.logout}
                        >Log Out</a>
                    </li>
                </ul>
            )
        }

        const loggedOutLinks = () => {
            return(
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="#!" className="nav-link">Log In</a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link">Sign Up</a>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <div className="navbar">
                    {this.props.uid ?
                        loggedInLinks()
                        :
                        loggedOutLinks()
                    }        
                </div>
                
                <ul className='timescale'>
                    <li><a href="/">Day</a></li>
                    <li><a href="/week">Week</a></li>
                    <li><a href="/month">Month</a></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(logOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Navbar)