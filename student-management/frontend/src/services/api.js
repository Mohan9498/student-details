const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/students/'

async function request(path='', options={}){
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type':'application/json' },
    ...options
  })
  if(!res.ok){
    const text = await res.text()
    throw new Error(text || res.status)
  }
  if(res.status === 204) return null
  return res.json()
}

export default {
  getStudents: ()=> request(''),
  getStudent: (id)=> request(id + '/'),
  addStudent: (payload)=> request('', {method:'POST', body: JSON.stringify(payload)}),
  updateStudent: (id, payload)=> request(id + '/', {method:'PUT', body: JSON.stringify(payload)}),
  deleteStudent: (id)=> request(id + '/', {method:'DELETE'}),
}
