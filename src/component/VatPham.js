import React from 'react'

function VatPham() {
  return (
    <div>
         <label>Chọn vật phẩm</label>
              <select>
                <option>Nhập vật phẩm</option>
              </select>
              <div>
                <label>Chiều rộng</label>
                <input type={'number'} />
                <label>Chiều dài</label>
                <input type={'number'} />
                <label>Chiều cao</label>
                <input type={'number'} />
                <label>Trọng lượng</label>
                <input type={'number'} />
                <label>Giá trị</label>
                <input type={'number'} />
              </div>
    </div>
  )
}

export default VatPham
