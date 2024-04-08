import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  return (
      <div className="container_body">
        <Header/>
        <Sidebar/>
      </div>
  )
}

export default AdminLayout
