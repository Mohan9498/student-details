import React, {useState, useEffect} from 'react'
import api from '../services/api'

export default function StudentForm(){
  const [form, setForm] = useState({id: null, name:'', phone:'', age:''})
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    const handler = (e)=>{
      if(e.detail && e.detail.student){
        setForm(e.detail.student)
      }
    }
    window.addEventListener('student-edit', handler)
    return ()=> window.removeEventListener('student-edit', handler)
  },[])

  function handleChange(e){
    const {name, value} = e.target
    setForm(prev=>({...prev, [name]: value}))
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!form.name.trim()){ alert('Name required'); return }
    setSaving(true)
    try{
      if(form.id){
        await api.updateStudent(form.id, {name: form.name, phone: form.phone, age: form.age || null})
      } else {
        await api.addStudent({name: form.name, phone: form.phone, age: form.age || null})
      }
      window.dispatchEvent(new CustomEvent('students-changed'))
      setForm({id:null, name:'', phone:'', age:''})
    }catch(err){
      console.error(err)
      alert('Error saving student')
    }finally{setSaving(false)}
  }

  function handleCancel(){
    setForm({id:null, name:'', phone:'', age:''})
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>Name
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
      </label>
      <label>Phone
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      </label>
      <label>Age
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn primary">{saving? 'Saving...' : (form.id? 'Update' : 'Add Student')}</button>
        <button type="button" className="btn" onClick={handleCancel}>Clear</button>
      </div>
    </form>
  )
}
