import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

export default function Register({setAuth}){
    const [input, setInput] = useState({
        email:"",
        password:"",
        name:""
    })

    const {email, password, name}=input;

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, password, name} 

            const response = await axios.post('/auth/register', input);

            const parseRes = await response.data
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Regitered Successfully")
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
            <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <h1 className='text-center my-5'>Register</h1>
                <form className='form' onSubmit={onSubmitForm}>
                    <input
                        type='email' 
                        className='form-control my-3'
                        name='email'
                        placeholder='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <input
                        type='password' 
                        className='form-control my-3'
                        name='password'
                        placeholder='password'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    <input
                        type='name' 
                        className='form-control my-3'
                        name='name'
                        placeholder='name'
                        value={name}
                        onChange={e => onChange(e)}
                    />
                        
                    <button className='btn btn-success btn-block' type='submit'>Submit</button>
                </form>
                <Link to='/login'>Login</Link>
            </div>
            <div className='col-md-3'></div>
            </div>
        </Fragment>
    )
}