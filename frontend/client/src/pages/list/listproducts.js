import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Navbar from '../../components/navbar/navbar';

export const ListProducts = () => {
    const [listProducts, setListProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/products/getAll');
            const sortedList = result.data.sort((a, b) => a.name.localeCompare(b.name));
            // Fetch and add image URLs to each product
            const listWithImages = await Promise.all(
                sortedList.map(async (product) => {
                    const imageUrl = await fetchImageUrl(product.image_name); // Replace 'image_name' with the field containing the image name in your database
                    console.log('Image URL for', product.name, ':', imageUrl); // Log the fetched image URL
                    return { ...product, imageUrl };
                })
            );
            setListProducts(listWithImages);
        } catch (error) {
            console.error('Error fetching Products:', error);
        }
    };

    const fetchImageUrl = async (imageName) => {
        try {
            const imageUrl = `http://localhost:8000/images/${imageName}`; // Replace with your image folder URL
            return imageUrl;
        } catch (error) {
            console.error('Error fetching image URL:', error);
            return ''; // Return an empty string in case of an error
        }
    };

   

    const goToEditProduct = (productId) => { 
        navigate(`/product/update/${productId}`);
    };

    const deleteProduct = async (productId, index) => {
        try {
            const result = await axios.delete(`http://localhost:8000/api/products/delete/${productId}`);
            if (result.status === 200) {
                const updatedProducts = listProducts.filter((product) => product._id !== productId);
                setListProducts(updatedProducts);
                console.log('Product deleted successfully');
            } else {
                console.log('Error deleting product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    };

    return (
        <>

        <Navbar/>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='card col-11 mt-5'>
            <div className='card-header bg-dark text-white'>Product List</div>
            <div className='card-body'>
              <div className='d-flex justify-content-center mb-5 mt-3'>
                <div>
                  <Link to="/product/add" className="btn btn-dark me-2 ps-3 pe-3">
                    Add Product
                  </Link>
                  <a href="http://localhost:8000/admin" className="btn btn-primary me-2 ps-3 pe-3">
                      AdminJs Panel
                  </a>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table table-borderless table-sm align-middle '>
                  <thead>
                    <tr className='align-center text-center'>
                      <th className='col-2'>Image</th>
                      <th className='col-2'>Name</th>
                      <th className='col-2'>Price</th>
                      <th className='col-2'>Category</th>
                      <th className='col-2'>Subcategory</th>
                      <th className='col-2'>Actions</th>
                    </tr>
                  </thead>
      
                  <tbody className="table-group-divider">
                    {listProducts.map((product, index) => (
                      <tr key={index} className='align-center text-center'>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ maxWidth: '100px' }}
                          />
                        </td>
                        <td className=''>{product.name}</td>
                        <td className=''>{product.price} USD</td>
                        <td className=''>{product.category} </td>
                        <td className=''>{product.subcategory} </td>
                        <td className=''>
                          <button onClick={() => goToEditProduct(product._id)} className='btn btn-dark me-2'>
                            Edit
                          </button>
                          <button onClick={() => deleteProduct(product._id)} className='btn btn-danger'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </>
      );
      
};

export default ListProducts;
