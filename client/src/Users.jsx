import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios"
function Users() {
    const [Users, setUsers] = useState([])
    useEffect(() => {
      axios.get("http://localhost:3001/users")
      .then(result=>setUsers(result.data))
      .catch(err=>console.log(err))
    }, [])
    
    const handleDelete=(id)=>{
        axios.delete("http://localhost:3001/deleteUser/"+id)
        .then(res=>{
            console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <Link to="/create" className="btn btn-success">Add +</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Users.map((user,index)=>(
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-success" style={{ marginRight: '10px' }}>Update</Link>
                                    <button className="btn btn-danger" onClick={(e)=>handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users;