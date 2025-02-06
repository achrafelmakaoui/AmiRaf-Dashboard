import React, { useEffect, useState } from 'react'
import './DetailsProduit.css'
import { motion } from "framer-motion"
import axios from 'axios'

const DetailsProduit = ({handleClose, productId}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await axios.get(`https://server.amiraf.shop/api/product/find/${productId}/`);
            setProduct(res.data);
          } catch(err){
              console.log(err)
          }
        };
        getProduct();
      }, []);

    const totalImages = 6;
    const [currentIndex, setCurrentIndex] = useState(1);
    const getImageUrl = (index) => {
        return `https://server.amiraf.shop${product[`image${index}`]}`;
    };

    const buttons = Array.from({ length: totalImages }, (_, i) => i + 1);
  return (
    <div className='ProductDetails'>
        <motion.div
            className="ProductDetailsAlert"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{type: "spring",stiffness: 260,damping: 20}}
        >
            <div className='bannerProductDetails'>
                <div className='ProductDetailsImages'>
                    <div className='ProductDetailsImgName'>
                        <img className="imgProduit" src={getImageUrl(currentIndex)} alt={`Product ${currentIndex}`} />                
                    </div>
                    <div className="buttonContainer">
                        {buttons.map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentIndex(number)}
                                style={{
                                backgroundColor: currentIndex === number ? "#30ca59" : "#F6F6F6",
                                cursor: "pointer",
                                }}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='ProductDetails-Perso'>
                    <div className='ProductDetails-row1'>
                        <h3>Product Information</h3>
                        <div className='ProductDetails-col1'>
                            <div className='ProductDetailsCl1'>
                                <span>Title</span>
                                <span>{product.title}</span>
                            </div>
                            <div className='ProductDetailsCl2'>
                                <span>New Price</span>
                                <span>{product.new_price}</span>
                            </div>
                            <div className='ProductDetailsCl3'>
                                <span>Old Price</span>
                                <span>{product.old_price}</span>
                            </div>
                        </div>
                        <div className='ProductDetails-col2'>
                            <div className='ProductDetailsCl1'>
                                <span>Discount %</span>
                                <span>{product.discount_percentage}</span>
                            </div>
                            <div className='ProductDetailsCl2'>
                                <span>Quantity</span>
                                <span>{product.quantity}</span>
                            </div>
                            <div className='ProductDetailsCl3'>
                                <span>Stock</span>
                                <span>{product.isInStock ? 'In Stock' : 'Out Of Stock'}</span>
                            </div>
                        </div>
                    </div>
                    <div className='ProductDetails-row2'>
                        <h3>Product Information</h3>
                        <div className='ProductDetails-col1'>
                            <div className='ProductDetails-row'>
                                <div className='ProductDetailsCl1Row'>
                                    <span>description</span>
                                    <span>{product.description}</span>
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

export default DetailsProduit

