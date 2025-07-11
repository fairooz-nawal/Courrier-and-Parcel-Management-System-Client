import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextAPI } from '../../Component/Context/AuthProvider';
import { useParams } from 'react-router';
import CustomerParcelRow from '../../Component/CustomerParcelRow';

const TrackParcelContainer = () => {
  const { token } = useContext(ContextAPI);
  const [parcels, setParcels] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/myparcels/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParcels(res.data.parcels); // ✅ store parcels in state
      } catch (error) {
        console.error("❌ Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [id, token]);
  return (
    <div>
      <div className="overflow-x-auto min-h-screen">
        <table className="table">
          {/* head */}
          <thead>
           
            <tr className='bg-purple-200 text-purple-700'>
              <th></th>
              <th>Parcel ID</th>
               <th>Parcel Type</th>
              <th>CreatedAt</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
         {
          parcels.map((parcel,index) => <CustomerParcelRow key={parcel._id} parcel={parcel} index={index}></CustomerParcelRow>)
         }
        </table>
      </div>
    </div>
  );
};

export default TrackParcelContainer;