import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../../store/actions/authAction';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {Link} from 'react-router-dom'

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
                        <Link 
                            to='/dashboard'
                            className="nav-link dashboard-link"
                        >
                            Dashboard
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <a 
                            href="#!" 
                            className="nav-link nav-add"
                        >
                            +
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="all" 
                            className="nav-link"
                        >
                            All Tasks
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            href="overdue" 
                            className="nav-link"
                        >
                            Overdue
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to='/login'
                            className="nav-link"
                            onClick = {this.props.logout}
                        >Log Out</Link>
                    </li>
                </ul>
            )
        }

        const loggedOutLinks = () => {
            return(
                <ul className="navbar-nav logged-out">
                    <li className="nav-item">
                        <Link to='/login' className="nav-link">Log In</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/signup' className="nav-link">Sign Up</Link>
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
                    <li><Link to="/">Day</Link></li>
                    <li><Link to="/week">Week</Link></li>
                    <li><Link to="/month">Month</Link></li>
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