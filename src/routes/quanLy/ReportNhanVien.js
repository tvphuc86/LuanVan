import React from 'react'
const ExcelJS = require('exceljs');

function ReportNhanVien(props) {
    const {data} = props
    const data1 = []
    data.forEach((e,i) => {
        data1[i] = [e.maNhanVien,  e.tenNhanVien,
            e.soDienThoai,
            e.soDonHang,
            e.luong,
            e.tongTienThuHo,
            e.tienNo]
    });
    const XuatFileExcel = () =>{
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;
        sheet.mergeCellsWithoutStyle('E3:I4')
        sheet.getCell('E3:I4').value = 'BÁO CÁO NHÂN VIÊN GIAO HÀNG';
        sheet.getCell('E3:I4').alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getCell('E3:I4').font = {bold:true,size: 18}


        sheet.getColumn('D').width = 20
        sheet.getColumn('E').width = 25
        sheet.getColumn('F').width = 15
        sheet.getColumn('G').width = 20
        sheet.getColumn("G").numFmt = '###,###,##0'
        sheet.getColumn('H').width = 20
        sheet.getColumn("H").numFmt = '###,###,##0'
        sheet.getColumn('I').width = 20
        sheet.getColumn("I").numFmt = '###,###,##0'
        sheet.getColumn('J').width = 30
        sheet.getColumn("J").numFmt = '###,###,##0'

        sheet.addTable({
            name: 'Thu',
            ref: 'D8',
            headerRow: true,
            totalsRow: true,
            style: {
              showRowStripes: true,
            },
            columns: [
              {name: 'Mã nhân viên', totalsRowLabel: 'Tổng:', filterButton: true},
              {name: "Tên nhân viên", totalsRowLabel: false, filterButton:true},
              {name: 'Số điện thoại', totalsRowLabel: false, filterButton: false},
              {name: 'Tổng số đơn đã nhận', totalsRowFunction: 'sum', filterButton: false},
              {name: 'Tổng lương', totalsRowFunction: 'sum', filterButton: false},
              {name: 'Tổng tiền thu hộ', totalsRowFunction: 'sum', filterButton: false},
              {name: 'Tiền nợ', totalsRowFunction: 'sum', filterButton: false},
            ],
            rows: data1
          });
          workbook.xlsx.writeBuffer().then(data=>{
            const blob = new Blob([data],{
                type:"application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href= url;
            anchor.download = 'BaoCaoNhanVien.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url)
         })
    }
  return (
    <button onClick={()=>XuatFileExcel()}>Xuất file excel</button>
  )
}

export default ReportNhanVien
