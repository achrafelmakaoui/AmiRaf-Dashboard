import React, { useEffect, useState } from 'react'
import './OrderDetails.css'
import { motion } from "framer-motion"
import axios from 'axios'

const OrderDetails = ({handleClose, itemId, orderId}) => {
    const [order, setOrder] = useState({});
    const [orderItem, setOrderItem] = useState({});


    useEffect(() => {
        const getClient = async () => {
          try {
            const res = await axios.get(`https://server.amiraf.shop/api/order/orders/${orderId}/${itemId}`);
            setOrder(res.data);
            setOrderItem(res.data.items[0] || {});
          } catch(err){
              console.log(err)
          }
        };
        getClient();
      }, []);
  return (
    <div className='MoreInfoClientDiv'>
        <motion.div
            className="InfoClientAlert"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{type: "spring",stiffness: 260,damping: 20}}
        >
            <div className='bannerInfoClient'>
                <div className='infoClientImgName'>
                    <img className='imgClient' src={`https://server.amiraf.shop${orderItem?.productId?.image1}`}/>
                </div>
                <div className='InfoClientPerso'>
                    <div className='infoClinetRw1Hist'>
                        <h3>Client Information</h3>
                        <div className='divPersInfoDf'>
                            <div className='divCl1'>
                                <span>Full Name</span>
                                <span>{order.clientName}</span>
                            </div>
                            <div className='divCl2'>
                                <span>Phone Number</span>
                                <span>{order.clientPhoneNumber}</span>
                            </div>
                            <div className='divCl3'>
                                <span>City</span>
                                <span>{order.clientVille}</span>
                            </div>
                        </div>
                        <div className='divPersInfoDf'>
                            <div className='divCl1'>
                                <span>Address</span>
                                <span>{order.clientAddress}</span>
                            </div>
                        </div>
                    </div>
                    <div className='infoClinetRw2Hist'>
                        <h3>Product Information</h3>
                        <div className='divPersInfoDf2'>
                            <div className='persoInfo1rw'>
                                <div className='divCl1Rw1'>
                                    <span>Ref</span>
                                    <span>{orderItem?.productId?._id || 'N/A'}</span>
                                </div>
                                <div className='divCl2Rw1'>
                                    <span>Title</span>
                                    <span>{orderItem?.productId?.title || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='infoClinetRw3Hist'>
                        <h3>Total Price</h3>
                        <div className='clientPointAndVistes'>
                            <div className='PointAndVisitescl1'>
                                <div className='firstOne'>
                                    <span>Price</span>
                                    <span>{orderItem.price} DH</span>
                                </div>                                
                                <div className='firstOneSvg'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className='PointAndVisitescl3'>
                                <div className='thirdOne'>
                                    <span>Quantity</span>
                                    <span>{orderItem.quantity}</span>
                                </div>                                
                                <div className='thirdOneSvg'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                            </div>
                            <div className='PointAndVisitescl2'>
                                <div className='secondOne'>
                                    <span>Total Price</span>
                                    <span>{orderItem.price * orderItem.quantity} DH</span>
                                </div>                                
                                <div className='secondOneSvg'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='CloseIcon'>
                    <svg onClick={handleClose} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>    
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default OrderDetails

