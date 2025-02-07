import React from 'react'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
function Header() {
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event)
    {
        event.preventDefault()
        let payload={username,password}
        fetch('http://localhost:5000/user/reg',
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            }
        )
        .then(res=>res.json())
        .then(data=>
        {
            if (data.success) {
                navigate('/Success');
            } else {
                navigate('/Abort');
            }            
        }
        )
        .catch(er=>
        {
            console.log(`Error Occured :${er.message}`)
        }
        )
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="formCont">
                <label htmlFor="username">Username : -</label>
                <input type="text" name="username" id="" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                <label htmlFor="password">Password :- </label>
                <input type="password" name="password" id="" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <input type="file" capture="user" />
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Header