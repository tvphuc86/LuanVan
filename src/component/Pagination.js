import { map } from 'lodash';
import React, { useState } from 'react'
import { returnPaginationRange } from '../utils/pageUtil';
import "./Pagination.css"
 
export default function Pagination(props) {
    const {limit, page , totalPage, siblings,handleChangePage,handleChangeLimitPage} = props;
    let array = returnPaginationRange(totalPage,page,limit,siblings)
  return (
    <div>
       <div className='page'>
            <ul className='list-page'>
                <li><span>Giới hạn trang:</span><input type={'number'} min={1} className="limit-page" value={limit} onChange={handleChangeLimitPage}></input></li>
                {array.map((value)=>{
                    if (value==page){
                    return(
                        <li key={value} className="page active" onClick={()=>{handleChangePage(value)}}>{value}</li>
                    )}
                    else{
                        return(
                            <li key={value} className="page" onClick={()=>{handleChangePage(value)}}>{value}</li>
                        )
                    }
                })}
               
            </ul>
        </div>
    </div>
  )
}
