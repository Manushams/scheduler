import React from 'react';
import {connect} from 'react-redux';
import {logIn} from '../../store/actions/authAction'

class LogIn extends React.Component{

    state = {
        email: null,
        password: null
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.logIn(this.state)
    }

    render(){
        const day = new Date(),
            {error} = this.props
        return(
            <div className='auth login'>

                <div className="top-bar">
                    <div>
                        <h3>
                            {day.getDate()} {day.toLocaleString('default', { month: 'long' })}, {day.getFullYear()}
                        </h3>
                        
                    </div>
                    <ul className='auth-timescale'>
                        <li><a href="/">Day</a></li>
                        <li><a href="/week">Week</a></li>
                        <li><a href="/month">Month</a></li>
                    </ul>
                </div>

                <div className="card">
                    <div className="auth-title">
                        Log In
                    </div>

                    <form onSubmit = {this.onSubmitHandler}>

                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id='email'   
                                onChange = {this.onChangeHandler} 
                            />
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id='password'   
                                onChange = {this.onChangeHandler}  
                            />
                        </div>

                        {error ? 
                            <div className="message">
                                {error}
                            </div>
                        :
                             null                        
                        }

                        <input 
                            type="submit"
                            className='submit-btn'    
                        />

                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logIn: (user) => dispatch(logIn(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)