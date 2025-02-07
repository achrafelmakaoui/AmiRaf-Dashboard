import React, { useEffect, useState } from 'react'
import './UpdateProduct.css'
import { motion } from "framer-motion"
import axios from 'axios'
import { userRequest } from "../../RequestMethod";

const UpdateProduct = ({handleClose,productId ,refreshProducts}) => {
    const [product, setProduct] = useState({});
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [newPrice, setNewPrice] = useState();
    const [oldPrice, setOldPrice] = useState();
    const [discountPercentage, setDiscountPercentage] = useState();
    const [quantity, setQuantity] = useState();

    

    useEffect(() => {
        const getShop = async () => {
          try {
            const res = await axios.get(`https://server.amiraf.shop/api/product/find/${productId}`);
            setProduct(res.data);
          } catch(err){
              console.log(err)
          }
        };
        getShop();
      }, [productId, product]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProductData = {
                title: title,
                description:description,
                new_price:newPrice,
                old_price:oldPrice,
                discount_percentage:discountPercentage,
                quantity:quantity,
            };
    
            const response = await userRequest.put(`/product/${product._id}`, updatedProductData);
    
            setProduct(response.data);
            refreshProducts();
            handleClose();
        } catch (error) {
            console.error('Error updating Shop:', error);
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
                                    <h2>Update Product</h2>
                                    <div className='addClientBannerForm'>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Title</label>
                                                <input type='text' placeholder={product.title} value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>New Price</label>
                                                <input type='number' placeholder={product.new_price} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Old Price</label>
                                                <input type='number' placeholder={product.old_price} value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}/>
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>Discount %</label>
                                                <input type='number' placeholder={product.discount_percentage} value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='addClientInputs'>
                                            <div className='InputsClm1'>
                                                <label>Quantity</label>
                                                <input type='number' placeholder={product.quantity} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                            </div>
                                            <div className='InputsClm1'>
                                                <label>Description</label>
                                                <input type='text' placeholder={product.description} value={description} onChange={(e) => setDescription(e.target.value)}/>
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

export default UpdateProduct

