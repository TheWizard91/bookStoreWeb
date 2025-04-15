"use client";

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useState, useEffect } from "react"

function Login () {

    /**
     * post: Login into accout.
     */

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    let href = "/dashboard/"
    const router = useRouter(href)
    const style = {
        marginRight: 10,
        color: router.asPath === href ? 'red' : 'black',
      }

    async function handleOnSubmit() {
        e.preventDefault()
        cosole.log("submitted it.");
    }

    const handleOnChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        console.log("emailIs:", e.target.value);
    }

    const handleOnChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        console.log("password:", e.target.value);
    }

    const handleOnLoginButton = (e) => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <center>
            <div id="loginCard" className="card" style={{width:"500px", marginTop:"200px"}}>
                <form className="ui container large form">
                    <h2 className="header">Login</h2>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="em" 
                            placeholder="Enter Email..."
                            value={email} 
                            onChange={handleOnChangeEmail}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="pass" 
                            placeholder="Enter Password..."
                            value={password} 
                            onChange={handleOnChangePassword}/>
                    </div>
                    <button 
                        className="ui blue button"
                        type="button"
                        onClick={handleOnLoginButton} 
                        style={style}>Login</button>
                </form>
                <div className = "w-100 text-center mt-2">
                    Forgot Password? <Link 
                        href={{pathname:"/[forgot]",}} 
                        as="/forgot">Forgot Password</Link>
                </div>
            </div>  
            <div className = "w-100 text-center mt-2">
                Need a account? <Link href="/signup">Signup</Link>
            </div>
        </center>
    )
    
}

export default Login;