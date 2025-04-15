"use client"

import "semantic-ui-css/semantic.min.css"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {useRef,useState,useEffect} from "react"
import {useAuth} from "../context/authcontext.js"

import {Form, Input, TextArea, Button, Select, Card, Grid, Icon, Divider, Transaction} from 'semantic-ui-react'
import {Placeholder} from 'semantic-ui-react'
import app from "../contexts/authContext"
import {firestore, collection, query, where, getDock} from "../firebase/firestore"
import db from "../firebase/firestore"
import ref from "../firebase/Storage"
import realtimeDB from '../firebase/realtimeDatabase'

const Signup = () => {

    let names=["sing up","password","confirm password"]
    let icons=["envelope icon","lock icon","lock icon","building icon","venus mars icon","address card icon"]
    const currentInputValue=useRef("")
    const currentInputField=useRef("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirm_password, setConfirmPassword] = useState()
    // const {current_user, signup, logout, setUser_id} = useAuth()

    function inputIdHandler(n:String){
        if(!n.includes(" ")){
            return "input"+n[0].toUpperCase()+n.slice(1)+"Id"
        } else {
            let splitted=n.split(" ")
            let firstStr=splitted[0]
            let secondStr=splitted[1]
            let res="input"+firstStr[0].toUpperCase()+firstStr.slice(1)+secondStr[0].toUpperCase()+secondStr.slice(1)+"Id"
            return res
        }
    }

    const handleOnChange =(e)=> {
        e.preventDefault()
        currentInputValue.current=e.target.value
        currentInputField.current=e.target.name
        console.log("val,name: ",currentInputValue.current+" "+e.target.name)
    }

    async function handleOnSubmitButton (e) {
        e.preventDefault()
        // console.log("clicked: ",currentInputField.current)
        if(password!==confirmPassword){
            return setError("Password do not match")    
        }
        signup(email,password)
    }

    return (
        <center
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <div 
                id="signinCard"
                className="ui card"
                style={{
                    width:"500px",}}>
                <form className="ui form" action=""> {/**ui container large form */}
                    <header><h2>Sign up</h2></header>
                    <div>
                        {names.map((name)=>(
                            <div className="field" id={name+"Id"} key={name}>
                                <div 
                                    className="ui basic label"
                                    for=""
                                    style={{
                                        display:"flex",
                                        width:"100%",
                                        border:"transparent"}}
                                    >{name}</div>
                                <div 
                                    className="ui focus icon input">
                                        <input 
                                            type={name==="sing up"?"email":"password"} 
                                            name={name}
                                            id={name.split(",").forEach(element => {
                                                let res=inputIdHandler(name)
                                            })}
                                            placeholder={name}
                                            onChange={handleOnChange}/>
                                        <i aria-hidden="true" className={icons[names.indexOf(name)]}></i>
                                </div>
                            </div>
                        ))}
                        {/* <div 
                            className="ui basic label"
                            id="userPhoneNumberId"
                            for="phone"
                            style={{
                                display:"flex",
                                width:"100%",
                                border:"transparent",
                                flexDirection:"column",
                                marginLeft:"0px",
                                alignItems:"flex-start"}}
                            >Enter your phone numer:<br />
                            <small>Format: 123-456-7890</small></div>
                        <div 
                            className="ui focus icon input"
                            id="userPhoneNumberInputId"
                            style={{display:"flex"}}>
                                <input 
                                    type="tel"
                                    name={name}
                                    id="phoneId"
                                    placeholder={"123..."}
                                    onChange={handleOnChange}
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    required/>
                                <i aria-hidden="true" className={icons[4]}></i>
                        </div> */}
                        {/* <address></address> */}
                        <button 
                            className="ui primary button"
                            style={{
                                marginBottom:"16px"
                            }}
                            onClick={handleOnSubmitButton}>
                                Submit
                        </button>
                    </div>
                </form>
                <link
                    rel="preload"
                    href="myFont.woff2"
                    as="font"
                    type="font/woff2"
                    crossorigin="anonymous" />
            </div>
        </center>
    )
}

export default Signup;