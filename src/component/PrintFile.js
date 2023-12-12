import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


const  PrintFile = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <p ref={componentRef} >ấdas</p>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default PrintFile