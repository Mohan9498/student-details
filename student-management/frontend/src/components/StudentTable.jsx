import React, {useEffect, useState} from 'react'
import api from '../services/api'

export default function StudentTable(){
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    try{
      const data = await api.getStudents()
      setStudents(data)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{
    load()
    const h = ()=> load()
    window.addEventListener('students-changed', h)
    return ()=> window.removeEventListener('students-changed', h)
  },[])

  function edit(student){
    window.dispatchEvent(new CustomEvent('student-edit', {detail:{student}}))
  }

  async function remove(id){
    if(!confirm('Delete this student?')) return
    await api.deleteStudent(id)
    load()
  }

  if(loading) return <div>Loading...</div>

  return (
    <table className="student-table">
      <thead>
        <tr><th>Name</th><th>Phone</th><th>Age</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {students.map(s=> (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.phone}</td>
            <td>{s.age}</td>
            <td className="actions">
              <div className="actions-inner">
                <button className="btn small" onClick={()=>edit(s)}>Edit</button>
                <button className="btn danger small" onClick={()=>remove(s.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
