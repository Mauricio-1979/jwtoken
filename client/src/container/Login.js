import axios from 'axios';
import React,{Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({setAuth}){

    const [input, setInput] = useState({
        email:"",
        password:""
    })

    const {email, password} = input;

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        try {
            //const body = {email, password};
            const response = await axios.post('/auth/login', input);
            //const parseRes = await response.json();
            const parseRes = await response.data;
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                toast.success("login successfully")
            } else {
                setAuth(false)
                toast.error(parseRes)
            }    
                

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
        <h1 className='text-center my-5'>Login</h1>
    
        {/* <button onClick={() =>setAuth(true)} >Authenticate</button> */}
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <form onSubmit={onSubmitClick}>
                    <input 
                        type='email' 
                        className='form-control my-3'
                        placeholder='Email' 
                        name='email'
                        value={input.email}
                        onChange={(e) => onChange(e)}
                    />
                    <input 
                        type='password' 
                        className='form-control my-3'
                        placeholder='Password' 
                        name='password'
                        value={input.password}
                        onChange={(e) => onChange(e)}
                    />
                    <button className='btn btn-success btn-block'>Submit</button>
                </form>
                <Link to='/register'>Register</Link>
            </div>
            <div className='col-md-3'></div>

        </div>
        </Fragment>
    )
}