import React from 'react'
const ExcelJS = require('exceljs');

function ReportCuocPhi(props) {
    const {data,filter} = props
    console.log(data);
    const data1 = []
    data.forEach((e,i) => {
        data1[i] = [
            e.maDonVanChuyen,
              e.thanhToan.toString(),
            e.cuocPhi,
            e.ngayThanhToan!= null ? new Date( Date.parse(e.ngayThanhToan)).toLocaleDateString() : ' ',
            new Date( Date.parse(e.ngayThem)).toLocaleDateString(),
           e.maTrangThaiDonVanChuyen == 19 ? 'Cước phí chuyển hoàn' : 'Cước phí  giao đơn' + ' ' +e.maDonVanChuyen,
            ]
    });
    const XuatFileExcel = () =>{
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;
        sheet.mergeCellsWithoutStyle('E3:I4')
        sheet.mergeCellsWithoutStyle('D6:E6')
        sheet.mergeCellsWithoutStyle('D5:E5')
        sheet.getCell('E3:I4').value = 'BÁO CÁO CƯỚC PHÍ';
        sheet.getCell('E3:I4').alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getCell('E3:I4').font = {bold:true,size: 18}
        sheet.getCell('D6:E6').value = 'Cước phí từ ngày  ' + new Date( Date.parse(filter.ngayBatDau)).toLocaleDateString() + ' đến ngày ' +  new Date( Date.parse(filter.ngayKetThuc)).toLocaleDateString()
        sheet.getCell('D5:E5').value ='Mã khách hàng: ' +  localStorage.getItem("maTaiKhoan")


        sheet.getColumn('D').width = 20
        sheet.getColumn('E').width = 25
        sheet.getColumn('F').width = 15
        sheet.getColumn('G').width = 20
        sheet.getColumn("F").numFmt = '###,###,##0'
        sheet.getColumn('H').width = 20
        sheet.getColumn('I').width = 40
        sheet.getColumn('J').width = 30

        sheet.addTable({
            name: 'Thu',
            ref: 'D8',
            headerRow: true,
            totalsRow: true,
            style: {
              showRowStripes: true,
            },
            columns: [
              {name: 'Mã đơn vận chuyển', totalsRowLabel: 'Tổng:', filterButton: true},
              {name: "Thanh toán", totalsRowLabel: false, filterButton:true},
              {name: 'Cước phí', totalsRowFunction: 'sum', filterButton: false},
              {name: 'Ngày thanh toán', filterButton: false},
              {name: 'Ngày thêm cước', filterButton: false},
              {name: 'Ghi chú', filterButton: false},
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
            anchor.download = 'BaoCaoCuocPhi.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url)
         })
    }
  return (
    <button onClick={()=>XuatFileExcel()}>Xuất file excel</button>
  )
}

export default ReportCuocPhi
