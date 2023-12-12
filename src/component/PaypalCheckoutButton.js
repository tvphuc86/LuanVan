import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import ThongKeQuanLyService from '../service/ThongKeQuanLyService';

const PaypalCheckoutButton = (props) => {
    const {data1,noCuoc,tienThuHo,ma,filters,nhanvien} = props;
    const soTien = Math.round(data1 * 0.00004 * 100)/100

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
       if(noCuoc && nhanvien==null){
            ThongKeQuanLyService.postNoCuocKhach(ma,filters.ngayBatDau,filters.ngayKetThuc)
            .then(rs => {alert(rs.data)
            window.location.reload()})
       }
       else{
        ThongKeQuanLyService.postTienThuHoNv(ma,filters.ngayBatDau,filters.ngayKetThuc)
        .then(rs => {alert(rs.data)
            window.location.reload()})
       }
    }

    if(error){
        alert(error);
    }

  return (
    <PayPalScriptProvider
    options={{"client-id": "Af1lBAg8K_nJeCL7ZCz1qZeZaZxiSMJ6cbbz6JgjaKq92w6jeoIntbKoBcxbWlVKoK228RPj3IaEnA8T"}}>
        <PayPalButtons 
            onClick={(data, actions) => {
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("You Already bough this course");
                    return actions.reject();
                }else{
                    return actions.resolve();
                }
            }}
            createOrder = {(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description:`${ma + ' ' +  nhanvien!=null?  'Chuyển khoản nợ cước' : "Chuyển khoản tiền thu hộ"  + new Date(filters.ngayBatDau).toDateString() + ' - ' +new Date(filters.ngayKetThuc).toLocaleDateString()}`,
                            amount: {
                                value: soTien
                            },
                        },
                    ],
                });
            }}
            onApprove = { async (data, action) => {
                const order = await action.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
        />
    </PayPalScriptProvider>
  )
}

export default PaypalCheckoutButton