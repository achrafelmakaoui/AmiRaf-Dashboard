import React, { useEffect, useState } from 'react'
import './ProductUI.css'
import UpdateShop from '../UpdateProduct/UpdateProduct'
import NewShop from '../newProduct/NewProduct'
import DetailsProduit from '../DetailsProduit/DetailsProduit'
import { userRequest } from "../../RequestMethod";

const ProductUI = () => {
    const [products, setProducts] = useState([]);
    const [mois, setMois] = useState();
    const [jour, setJour] = useState();
    const [title, setTitle] = useState('');
    const [isInStock, setIsInStock] = useState();
    const [quantity, setQuantity] = useState();
    const [productId, setProductId] = useState();
    const [updateProduct, setUpdateProduct] = useState(false);
    const [detailsProduit, setDetailsProduit] = useState(false);
    const [newProduct, setNewProduct] = useState(false);

    const getProducts = async () => {
        let url = "/product/multiFilter?";
        const queryParams = [];
    
        if (mois) queryParams.push(`mois=${mois}`);
        if (jour) queryParams.push(`jour=${jour}`);
        if (title) queryParams.push(`title=${title}`);
        if (quantity) queryParams.push(`quantity=${quantity}`);
        if (isInStock !== undefined) queryParams.push(`isInStock=${isInStock}`);
    
        if (queryParams.length > 0) {
            url += queryParams.join('&');
        }
    
        try {
            const res = await userRequest.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };
    
    const deleteProduct = async (id) => {
        try {
            await userRequest.delete(`/product/${id}`);
            await getProducts();
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        getProducts();
    }, [mois, jour, title, quantity, isInStock]);

    const handelClickUpdateProduct = (productId) => {
        setUpdateProduct(true);
        setProductId(productId)
    }
    const handelClickProductDetails = (productId) => {
        setDetailsProduit(true);
        setProductId(productId);
    }
    const handelClickCloseIcon = () => {
        setNewProduct(false);
        setUpdateProduct(false);
        setDetailsProduit(false);
    };
    const handelClickNewProduct = () => {
        setNewProduct(true);
    };
  return (
    <div className='ShopUI'>
        <div className='headershopIcons'>
            <div className="bell">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
            <div className='shopBag' onClick={handelClickNewProduct}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
        </div>
        <div className='shopTable'>
            <div className='filtershop'>
                <div className="search-shop">
                    <div className='serachShoopByNumeroBon'>
                        <input type='text' placeholder="Filter By Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
                <div className='shopFilterMois'>
                    <div className='shopFilterMoisSel'>
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
                <div className='shopFilterJour'>
                    <div className='shopFilterJourSel'>
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
                <div className='shopFilterStatus'>
                    <div className='shopFilterStatusSel'>
                       <select name="status" value={isInStock} onChange={(e) => setIsInStock(e.target.value)}>
                            <option value={null}>
                                Filter By Stock
                            </option>
                            <option value='true'>IS (In Stock)</option>
                            <option value='false'>OS (Out of Stock)</option>
                        </select>
                    </div>
                </div>
                <div className='shopFilterStation'>
                    <div className='shopFilterStationInp'>
                       <input type='text' placeholder='Filter By Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)}/> 
                    </div>
                </div>
            </div>
            <div className='shopTableDs'>
                <table className='tableShop'>
                    <thead>
                        <tr className='trHeadShop'>
                            <th>Product</th>
                            <th>Title</th>
                            <th>NewPrice</th>
                            <th>OldPrice</th>
                            <th>Discount</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                            <th>Product Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index) => (
                        <tr key={index} className='trBodyTd'>
                            <td  data-label="Shop">
                                <div className='shopOwner'>
                                    <img
                                        className='shopOwner-Img' 
                                        src={`https://server.amiraf.shop${product.image1}`}
                                        alt='itemShop'
                                    />
                                </div>
                            </td>
                            <td data-label="Station"><span>{product.title}</span></td>
                            <td data-label="Type de Shop"><span>{product.new_price}</span></td>
                            <td data-label="Type de Shop"><span>{product.old_price}</span></td>
                            <td data-label="Type de Shop"><span>{product.discount_percentage}%</span></td>
                            <td data-label="Shop Point"><span>{product.quantity}</span></td>
                            <td>
                                {(() => {
                                    let className, svgContent;

                                    switch (product.isInStock ? 'IS' : 'OS') {
                                        case 'IS':
                                            className = 'statusIS';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                            );
                                            break;
                                        case 'OS':
                                            className = 'statusOS';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <div className={className}>
                                            {svgContent}
                                            <span>{product.isInStock ? 'IS' : 'OS'}</span>
                                        </div>
                                    );
                                })()}
                            </td>
                            <td data-label="Date"><span>{formatDate(product.createdAt)}</span></td>
                            <td data-label="Actions">
                                <div className='ActionsInfo'>
                                    <div className='ActionDelIcon' onClick={()=> deleteProduct(product._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </div>
                                    <div className='ActionUpdIcon' onClick={() => handelClickUpdateProduct(product._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                    </div>
                                    <div className='ActionMoreInfoIcon' onClick={()=> handelClickProductDetails(product._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        {newProduct && <><NewShop handleClose={handelClickCloseIcon} refreshProducts={getProducts}/></>}
        {updateProduct && <UpdateShop handleClose={handelClickCloseIcon} productId={productId} refreshProducts={getProducts}/>}
        {detailsProduit && <DetailsProduit handleClose={handelClickCloseIcon} productId={productId}/>}
    </div>
  )
}

export default ProductUI