import React, { useEffect, useState } from 'react'
import './UpdateOrder.css'
import { motion } from "framer-motion"
import axios from 'axios'

const UpdateOrder = ({handleClose, orderId, itemId, refreshOrders}) => {
    const [order, setOrder] = useState({});
    const [orderItem, setOrderItem] = useState({});
    const [nomComplet, setNomComplet] = useState('');
    const [qte, setQte] = useState(null);
    const [status, setStatus] = useState('');
    const [ville, setVille] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');

    useEffect(() => {
        const getOrder = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/order/orders/${orderId}/${itemId}`);
            setOrder(res.data);
            setOrderItem(res.data.items[0] || {});
          } catch(err){
              console.log(err)
          }
        };
        getOrder();
      }, [order]);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const updatedOrderData = {
                quantity: qte,
                status,
                clientName: nomComplet,
                clientAddress: address,
                clientVille: ville,
                clientPhoneNumber: telephone,
            };
            const response = await axios.put(
                `http://localhost:5000/api/order/orders/${orderId}/${itemId}`,
                updatedOrderData
            );
            console.log("Order updated:", response.data);
            setOrder(response.data);
            refreshOrders();
            handleClose();
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

  return (
        <div className='UpdateClientDiv'>
            <motion.div
                className="UpdateClientAlert"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{type: "spring", stiffness: 260, damping: 20}}
            >
                <div className='bannerUpdateClient'>
                    <div className='contentUpdateClient'>
                            <form onSubmit={handleSubmit}>
                                <div className='contentUpdateClientKey'>
                                    <h2>Update Transaction</h2>
                                    <div className='addClientBannerForm'>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Product</label>
                                                <input type='text' placeholder={orderItem.productId?._id} disabled/>
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>Full Name</label>
                                                <input type='text' placeholder={order.clientName} value={nomComplet} onChange={(e) => setNomComplet(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Phone Number</label>
                                                <input type='text' placeholder={order.clientPhoneNumber} value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>City</label>
                                                <input type='text' placeholder={order.clientVille} value={ville} onChange={(e) => setVille(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Address</label>
                                                <input type='text' placeholder={order.clientAddress} value={address} onChange={(e) => setAddress(e.target.value)}/>
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>Quantity</label>
                                                <input type='number' placeholder={orderItem.quantity} value={qte} onChange={(e) => setQte(e.target.value)}/>
                                            </div>
                                            
                                        </div>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Status</label>
                                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value='ATT'>ATT</option>
                                                    <option value='CNF'>CNF</option>
                                                    <option value='NTW'>NTW</option>
                                                    <option value='REF'>REF</option>
                                                    <option value='RTR'>RTR</option>
                                                    <option value='LVR'>LVR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='btnSubmit'>
                                        <button type="submit">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                    </div>
                    <div className='CloseIcon'>
                        <svg onClick={handleClose} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>    
                    </div>
                </div>
            </motion.div>
        </div>
  )
}

export default UpdateOrder

