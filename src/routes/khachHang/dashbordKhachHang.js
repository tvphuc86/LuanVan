import React from 'react'
import BarChart1 from '../../component/Bar'
import NavControl from '../../component/NavControl'
import SearchBar from '../../component/SearchBar'
import navlinkKhachHang from './linkKhachHang'

function dashbordKhachHang() {
  return (
    <div>
      <SearchBar />
      <NavControl links={navlinkKhachHang} />
      <div className='content'>
      <BarChart1 />
      </div>
      
    </div>
  )
}

export default dashbordKhachHang
