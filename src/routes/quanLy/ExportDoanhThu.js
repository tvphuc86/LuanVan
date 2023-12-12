import React, { useEffect, useState } from 'react'
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
const ExcelJS = require('exceljs');
function ExportDoanhThu(props) {
    const {filter} = props
    const [tongChi,setTongChi] = useState([])
    const [tongThu,setTongThu] = useState([])

    useEffect(()=>{
        ThongKeQuanLyService.getTongChi(filter.ngayBatDau,filter.ngayKetThuc).then(rs=>setTongChi(rs.data))
        ThongKeQuanLyService.getTongThu(filter.ngayBatDau,filter.ngayKetThuc).then(rs=>setTongThu(rs.data))
    },[filter])
    const chi = []
    const thu = []
    tongChi.forEach((e,i) => {
        chi[i] = [e.maDonHang,  e.thanhToan,
            new Date(Date.parse( e.ngayThuVao)).toLocaleDateString(),
          
            e.ghiChu,
            e.soTien]
    });
    tongThu.forEach((e,i) => {
        thu[i] = [e.maDonHang,e.thanhToan,
            new Date(Date.parse( e.ngayThuVao)).toLocaleDateString(),
            
            e.ghiChu,
            e.soTien]
    });
    const exportDoanhThu = () =>{
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;
        sheet.mergeCellsWithoutStyle('E3:I4')
        sheet.mergeCellsWithoutStyle('E5:I5')
        sheet.mergeCellsWithoutStyle('B6:E6')
        sheet.getCell('B6:E6').value = 'Thu chi từ ngày  ' + new Date( Date.parse(filter.ngayBatDau)).toLocaleDateString() + ' đến ngày ' +  new Date( Date.parse(filter.ngayKetThuc)).toLocaleDateString()
        sheet.getCell('E3:I4').value = 'BÁO CÁO DOANH THU';
        sheet.getCell('E3:I4').alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getCell('E3:I4').font = {bold:true,size: 18}
        sheet.getCell('B6:E^').font = {bold:true,size: 14}
        sheet.getCell('E5:I5').value = 'Thời gian lập' + new Date().toLocaleDateString() + ":" + new Date().toLocaleTimeString();
        sheet.getCell('E5:I5').alignment = { vertical: 'middle', horizontal: 'center' };

        sheet.getColumn('B').width = 25
        sheet.getColumn('C').width = 20
        sheet.getColumn('D').width = 20
        sheet.getColumn('E').width = 40
        sheet.getColumn('F').width = 25
        sheet.getColumn("F").numFmt = '###,###,###'

        
        sheet.getColumn('H').width = 25
        sheet.getColumn('I').width = 20
        sheet.getColumn('J').width = 20
        sheet.getColumn('K').width = 40
        sheet.getColumn('L').width = 25
        sheet.getColumn("L").numFmt = '###,###,###'
        
        sheet.getCell('B9').value = 'Bảng thu'
        sheet.getCell('H9').value = 'Bảng chi'
        sheet.addTable({
            name: 'Thu',
            ref: 'B11',
            headerRow: true,
            totalsRow: true,
            style: {
              showRowStripes: true,
            },
            columns: [
              {name: 'Mã vận đơn', totalsRowLabel: 'Tổng thu:', filterButton: true},
              {name: "Thanh toán", totalsRowLabel: false, filterButton:true},
              {name: 'Ngày', totalsRowLabel: false, filterButton: false},
              {name: 'Ghi chú', totalsRowLabel: false, filterButton: false},
              {name: 'Số tiền', totalsRowFunction: 'sum', filterButton: false},
            ],
            rows: thu
          });
          sheet.addTable({
            name: 'Chi',
            ref: 'H11',
            headerRow: true,
            totalsRow: true,
            style: {
              showRowStripes: true,
            },
            columns: [
              {name: 'Mã vận đơn', totalsRowLabel: 'Tổng chi:', filterButton: true},
              {name: "Thanh toán ", totalsRowLabel: false, filterButton:true},
              {name: 'Ngày', totalsRowLabel: false, filterButton: false},
              {name: 'Ghi chú', totalsRowLabel: false, filterButton: false},
              {name: 'Số tiền', totalsRowFunction: 'sum', filterButton: false},
            ],
            rows: chi
          });


         workbook.xlsx.writeBuffer().then(data=>{
            const blob = new Blob([data],{
                type:"application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href= url;
            anchor.download = 'BaoCaoThuChi.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url)
         })
    }
  return (
    <button onClick={()=>exportDoanhThu()}>Xuất file excel</button>
  )
}

export default ExportDoanhThu
