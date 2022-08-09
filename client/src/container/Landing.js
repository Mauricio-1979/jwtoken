import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import s from './Landing.module.css'

export default function Landing(){
    return (
        <div className={s.bodys}>
            <h1 className={s.tittle}>Welcome</h1> 
            <p className={s.parrafo}>
                This is a simple online test program where you can record your tasks without having to download any program. Developed with Json Web Token and bcrypt security technology
            </p>   
                
            <Link to="/login" style={{textDecorationLine: 'none'}}>
            <div className={s.contenedor}>
                <p className={s.btn}>Entre</p>
            </div>
            </Link>

            <p className={s.by}>by Mauricio Bo</p>

        </div>
        
    )
}