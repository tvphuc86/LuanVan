import React from 'react'
import NavControl from '../component/NavControl'
import SearchBar from '../component/SearchBar'
import './DashboardQuanLy.css'
import navlinkQuanLy from './quanLy/linkquanly'
function DashboardQuanLy() {
  return (
    <div className='container'>
      <NavControl links={navlinkQuanLy} />
      <SearchBar />
    </div>
  )
}

export default DashboardQuanLy
