import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import s from './Dashboard.module.css';

export default function Dashboard({setAuth}){

    const [edition, setEdition] = useState(false)
    const [tareas, setTareas] = useState([]);
    
    const [input, setInput] = useState({
        title: "",
        task: "",
        users_id: "",
        todo_id: ""
    });
    
    async function getName(){
        try {
            const response = await axios.get('/dashboard', {
                headers: {token: localStorage.token}
            });
            const parseRes = await response.data;
            setTareas(parseRes)
            setInput({
                users_id : parseRes[0].users_id
            })
            
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)
        toast.success("Logged out successfully")
    }

    useEffect(() => {
        getName()
    },[])

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        try { 
            if(edition === false){
            const posdata = await axios.post(`/dashboard/todo`, input)
            
            const respuesta = await posdata.data;
            if(respuesta){
                getName()
                alert("La tarea fue creada con exito")
                setInput({
                    title: "",
                    task: "",
                    users_id: "",
                    todo_id: ""
                });
                
            } else {
                console.log("hubo un problema")
            }
        } else {
            const actualization = await axios.put(`/dashboard/todo/${input.todo_id}`, input)

            const respuesta = await actualization.data;
            
            if(respuesta === 1){
                setEdition(false)
                getName()
                alert("La actualización fue exitosa")
                setInput({
                    title: "",
                    task: "",
                    users_id: "",
                    todo_id: ""
                });
            } 
        }
        } catch (err) {
            console.log(err.message)
            
        }
    }

    const setUpdate = async (item) => {
        setInput({
            title: item.title,
            task: item.task,
            users_id: "",
            todo_id: item.todo_id
        })
        
        setEdition(true)
    }

    

    const setDelete = async (id) => {
       
        try {
            const borrar = await axios.delete(`/dashboard/delete/${id}`)
            const resultado = await borrar.data;
            if(resultado === 1){
                alert("Item eliminado");
                getName()
            }
        } catch (err) {
            
        }
    }

    const clean = () => {
        setEdition(false)
        setInput({
            title: "",
            task: "",
            users_id : tareas[0].users_id,
            todo_id: ""
            
        })
    }
    
    return (
        <div className={s.dashbody}>
            
            <h1 style={{color:"yellow"}}>Dashboard</h1>
            <h2>Welcome <b style={{marginRight:'10px'}}>{tareas.length !== 0  ? tareas[0].user_name : "wait name"}</b>
            <button 
                className='btn btn-primary'
                onClick={e => logout(e)}
                >Logout</button></h2>
            <hr/>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <button className='btn btn-secondary mb-2'
                        onClick={()=> clean()}
                        >Clean Form
                        </button> 
                        <form onSubmit={onSubmitClick}>
                            <input 
                                className='form-control'
                                type="text" 
                                value={input.title} 
                                name="title" 
                                onChange={e => onChange(e)} 
                                placeholder="Title" /><br/>
                            <input 
                                className='form-control'
                                type="text" 
                                value={input.task} 
                                name="task" 
                                onChange={e => onChange(e)} 
                                placeholder="Task description" />
                            <button className='btn btn-success btn-block mt-4' >Submit</button>    
                        </form>
                    </div>
                    <div className='col-6'>
                        <table className="table">
                            <thead style={{color:"yellow"}}>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Task</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                   
                            {tareas?.map((item) => {
                                return (
                                        <tr key={item.todo_id} style={{color:"white",fontWeight:"bold"}} >
                                        <td>{item.title}</td>
                                        <td>{item.task}</td>
                                        
                                        <td style={{}}>
                                            <button className='btn btn-warning mr-1' onClick={() =>setUpdate(item)}><i className="fa-solid fa-pencil"></i></button>
                                            <button className='btn btn-danger' onClick={() => setDelete(item.todo_id)} ><i className="fa-solid fa-trash-can"></i></button>
                                            
                                        </td>
                                        </tr>
                                                ) 
                                            }) }
                                             
                            </tbody>
                               
                        </table> 
                    </div>
                </div>
            </div>    
        </div>
    )
}