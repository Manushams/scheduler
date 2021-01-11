import React from 'react';

class LogIn extends React.Component{

    state = {
        username: null,
        password: null
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render(){
        return(
            <div className='auth login'>
                <div className="card">
                    <div className="auth-title">
                        Log In
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
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id='password'   
                                onChange = {this.onChangeHandler}  
                            />
                        </div>

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

export default LogIn