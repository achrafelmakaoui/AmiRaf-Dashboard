import React, { useState } from 'react';
import { motion } from "framer-motion"
import './NewProduct.css'
import axios from 'axios';

function NewProduct({handleClose, refreshProducts}) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [newPrice, setNewPrice] = useState();
    const [oldPrice, setOldPrice] = useState();
    const [discountPercentage, setDiscountPercentage] = useState();
    const [quantity, setQuantity] = useState();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('new_price', newPrice);
        formData.append('old_price', oldPrice);
        formData.append('discount_percentage', discountPercentage);
        formData.append('quantity', quantity);
        formData.append('image1', image1);
        formData.append('image2', image2);
        formData.append('image3', image3);
        formData.append('image4', image4);
        formData.append('image5', image5);
        formData.append('image6', image6);

        try {
            const response = await axios.post('https://server.amiraf.shop/api/product/add-product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            refreshProducts();
            handleClose();
        } catch (error) {
            console.error('Error adding product:', error.message);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div className='AddProduct'>
            <motion.div
                className="AddProductAlert"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{type: "spring", stiffness: 260, damping: 20}}
            >
                <div className='AddProduct-bnr'>
                    <div className='AddProductCl1'>
                        <h2>Add Product</h2>
                        <svg onClick={handleClose} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                            <form onSubmit={handleSubmit}>
                                <div className='AddProductBannerForm'>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label>Title</label>
                                            <input type='text' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className='InputsClm1'>
                                            <label>New Price</label>
                                            <input type='number' placeholder='Enter New Price' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label>Old Price</label>
                                            <input type='number' placeholder='Enter Old Price' value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}/>
                                        </div>
                                        <div className='InputsClm1'>
                                            <label>Discount %</label>
                                            <input type='number' placeholder='Enter Discount' value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label>Quantity</label>
                                            <input type='number' placeholder='Entre quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                        </div>
                                        <div className='InputsClm1'>
                                            <label>Description</label>
                                            <input type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 1</label>
                                            <input type='file' onChange={(e) => setImage1(e.target.files[0])} required />
                                        </div>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 2</label>
                                            <input type='file' onChange={(e) => setImage2(e.target.files[0])} required />
                                        </div>
                                    </div>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 3</label>
                                            <input type='file' onChange={(e) => setImage3(e.target.files[0])} required />
                                        </div>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 4</label>
                                            <input type='file' onChange={(e) => setImage4(e.target.files[0])} required />
                                        </div>
                                    </div>
                                    <div className='AddProductInputs'>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 5</label>
                                            <input type='file' onChange={(e) => setImage5(e.target.files[0])} required />
                                        </div>
                                        <div className='InputsClm1'>
                                            <label htmlFor="photo">Image 6</label>
                                            <input type='file' onChange={(e) => setImage6(e.target.files[0])} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='btnSubmit' style={{marginTop:'1rem'}}>
                                    <button type="submit">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Add
                                    </button>
                                </div>
                            </form>
                </div>
            </motion.div>
        </div>
    );
}

export default NewProduct;
