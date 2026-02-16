import React from 'react'
import DashboardLayout from './components/DashboardLayout'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'

export default function App(){
  return (
    <DashboardLayout>
      <div className="grid">
        <div className="card form-card">
          <h2>Add / Edit Student</h2>
          <StudentForm />
        </div>
        <div className="card table-card">
          <h2>Students</h2>
          <StudentTable />
        </div>
      </div>
    </DashboardLayout>
  )
}
