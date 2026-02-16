import React from 'react'

export default function DashboardLayout({children}){
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Student Management</div>
      </header>
      <main className="container">
        {children}
      </main>
      <footer className="footer">© {new Date().getFullYear()} Business App</footer>
    </div>
  )
}
