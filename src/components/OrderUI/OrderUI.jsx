import React, { useState, useEffect } from 'react'
import './OrderUI.css'
import UpdateTransaction from '../UpdateOrder/UpdateOrder'
import MoreInfoClient from '../OrderDetails/OrderDetails'
import { userRequest } from "../../RequestMethod";

const OrderUI = () => {
    const [orders, setOrders] = useState([]);
    const [mois, setMois] = useState();
    const [jour, setJour] = useState();
    const [clientPhoneNumber, setClientPhoneNumber] = useState('');
    const [status, setStatus] = useState('');
    const [productId, setProductId] = useState('');
    const [orderId, setOrderId] = useState();
    const [updateOrder, setUpdateOrder] = useState(false);
    const [orderDetails, setOrderDetails] = useState(false);
    const [itemId, setItemId] = useState();

    const getOrders = async () => {
        let url = "/order/orders/filter?";
        
        const queryParams = [];
    
        if (mois) queryParams.push(`mois=${mois}`);
        if (jour) queryParams.push(`jour=${jour}`);
        if (clientPhoneNumber) queryParams.push(`clientPhoneNumber=${clientPhoneNumber}`);
        if (productId) queryParams.push(`productId=${productId}`);
        if (status) queryParams.push(`status=${status}`);
    
        if (queryParams.length > 0) {
            url += queryParams.join('&');
        } else {
            url = "/order/orders/filter";
        }
    
        try {
            const res = await userRequest.get(url);
            setOrders(res.data.orders);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };
    
    const deleteOrder = async ({ itemId, orderId }) => {
        try {
            const res = await userRequest.delete(`/order/orders/${orderId}/${itemId}`);
            await getOrders();
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        getOrders();
    }, [mois, jour, clientPhoneNumber, productId, status]);

    const handelClickUpdateOrder = ({ itemId, orderId }) => {
        setUpdateOrder(true);
        setOrderId(orderId);
        setItemId(itemId);
    }
    const handelClickOrderDetails = ({ itemId, orderId }) => {
        setOrderDetails(true);
        setOrderId(orderId);
        setItemId(itemId);
    };
    const handelClickCloseIcon = () => {
        setUpdateOrder(false);
        setOrderDetails(false);
    };
  return (
    <div className='transactionUI'>
        <div className='headertransactionIcons'>
            <div className="bell">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
        </div>
        <div className='transactionTable'>
            <div className='filterTransactions'>
                <div className="search-transaction">
                    <div className='serachByNumeroBon'>
                        <input type='text' placeholder="Filter By Product" value={productId} onChange={(e) => setProductId(e.target.value)}/>
                    </div>
                </div>
                <div className='transactionFilterMois'>
                    <div className='transactionFilterMoisSel'>
                        <select name="day" value={mois} onChange={(e) => setMois(e.target.value)}>
                            <option>
                                Filter By Month
                            </option>
                            {Array.from({ length: 12 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='transactionFilterJour'>
                    <div className='transactionFilterJourSel'>
                       <select name="day" value={jour} onChange={(e) => setJour(e.target.value)}>
                            <option>
                                Filter By Day
                            </option>
                            {Array.from({ length: 31 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='transactionFilterStatus'>
                    <div className='transactionFilterStatusSel'>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>
                                Filter By Status
                            </option>
                            <option value='ATT'>ATT</option>
                            <option value='CNF'>CNF</option>
                            <option value='NTW'>NTW</option>
                            <option value='REF'>REF</option>
                            <option value='RTR'>RTR</option>
                            <option value='LVR'>LVR</option>
                        </select>
                    </div>
                </div>
                <div className='transactionFilterStation'>
                    <div className='transactionFilterStationInp'>
                       <input type='text' name='telephone' placeholder='Filter By Telephone' value={clientPhoneNumber} onChange={(e) => setClientPhoneNumber(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className='TransactionTableDs'>
                <table className='tableTrans'>
                    <tr className='trHead'>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Ville</th>
                        <th>Telephone</th>
                        <th>Qty</th>
                        <th>TotalPrice</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                    </tr>
                    {orders.map((order, orderIndex) => 
                        order.items.map((item, itemIndex) => (
                        <tr  key={`${order._id}-${itemIndex}`}>
                            <td>
                                <div className='transactionOwner'>
                                    <img className='transactionOwner-Img' src={`https://server.amiraf.shop${item?.productId?.image1}`} alt='product'/>
                                </div>
                            </td>
                            <td><span>{order.clientName}</span></td>
                            <td><span>{order.clientVille}</span></td>
                            <td><span>{order.clientPhoneNumber}</span></td>
                            <td><span>{item.quantity}</span></td>
                            <td><span>{item.quantity * item.price} DH</span></td>
                            <td>
                                {(() => {
                                    let className, svgContent;

                                    switch (item.status) {
                                        case 'ATT':
                                            className = 'statusATT';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                                            );
                                            break;
                                        case 'CNF':
                                            className = 'statusCNF';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            );
                                            break;
                                        case 'NTW':
                                            className = 'statusCNF-N';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-phone-missed"><line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            );
                                            break;
                                        case 'REF':
                                            className = 'statusREF';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            );
                                            break;
                                        case 'RTR':
                                            className = 'statusRTR';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                                            );
                                            break;
                                        case 'LVR':
                                            className = 'statusLVR';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <div className={className}>
                                            {svgContent}
                                            <span>{item.status}</span>
                                        </div>
                                    );
                                })()}
                            </td>
                            <td><span>{formatDate(order.createdAt)}</span></td>
                            <td>
                                <div className='ActionsInfo'>
                                    <div className='ActionDelIcon' onClick={()=> deleteOrder({ itemId: item._id, orderId: order._id })}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </div>
                                    <div className='ActionUpdIcon' onClick={() => handelClickUpdateOrder({ itemId: item._id, orderId: order._id })}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                    </div>
                                    <div className='ActionMoreInfoIcon' onClick={() => handelClickOrderDetails({ itemId: item._id, orderId: order._id })}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </table>
            </div>
        </div>
        {updateOrder && <><UpdateTransaction handleClose={handelClickCloseIcon} itemId={itemId} orderId={orderId} refreshOrders={getOrders}/></>}
        {orderDetails && <><MoreInfoClient handleClose={handelClickCloseIcon} itemId={itemId} orderId={orderId} /> </>}
    </div>
  )
}

export default OrderUI