import React from 'react';

const CustomerParcelRow = ({parcel,index}) => {
  console.log(parcel);
 const {createdAt,deliveryAddress,parcelType,paymentMethod,pickupAddress,status,_id} = parcel
  return (
         <tbody>
            {/* row */}
            <tr className="hover:bg-base-300">
              <th>{index+1}</th>
              <td>{_id}</td>
              <td>{parcelType}</td>
              <td>{createdAt}</td>
              <td>{pickupAddress}</td>
              <td>{deliveryAddress}</td>
              <td>{paymentMethod}</td>
              <td>{status}</td>
              <td><div className="flex gap-4">
                <div className=""><button className="btn btn-warning text-white">View Detail</button></div>
                <div className=""><button className="btn btn-error text-white">Delete</button></div>
              </div></td>
            </tr>
          </tbody>
    );
};

export default CustomerParcelRow;