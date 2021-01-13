import React from 'react';
import {connect} from 'react-redux';
import {createUser} from '../../store/actions/authAction';
import {Redirect} from 'react-router-dom';

class SignUp extends React.Component{

    state = {
        username: null,
        email: null,
        password: null,
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
    }

    render(){
        const day = new Date(),
            {error, uid} = this.props;

        if(uid)this.props.history.push('/')
        
        return(
            <div className='auth signin'>

                <div className="top-bar">
                    <div>
                        <h3>
                            {day.getDate()} {day.toLocaleString('default', { month: 'long' })}, {day.getFullYear()}
                        </h3>
                        
                    </div>
                    <ul>
                        <li><a href="/">Day</a></li>
                        <li><a href="/week">Week</a></li>
                        <li><a href="/month">Month</a></li>
                    </ul>
                </div>

                <div className="card">
                    <div className="auth-title">
                        Sign Up
                    </div>
        
                    <form onSubmit = {this.onSubmitHandler}>
        
                        <div className="input-field">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text"
                                id='username' 
                                onChange = {this.onChangeHandler}   
                            />
                        </div>

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
        error: state.auth.error,
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createUser: (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);