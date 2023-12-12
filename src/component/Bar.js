
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function BarChart1(props) {
  const {data,lable,keybars} = props
  console.log(data);
  return (
    <div width="100%" height="100%">
        <BarChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={lable} style={{fontSize: '10px'}}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={keybars}
          width={10}
           fill="#8884d8" />
        </BarChart>
      </div>
  )
}

export default BarChart1
