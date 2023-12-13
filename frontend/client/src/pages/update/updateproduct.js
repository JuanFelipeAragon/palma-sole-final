import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();
  const params = useParams(); // Get URL parameters
  const productID = params.productID; // Extract pet ID from URL params
  console.log(productID);

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/products/getOne/${productID}`);
      const product = result.data;

      if (product) {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setSubcategory(product.subcategory);
      } else {
        console.error('Product data not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('image', image);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/update/${productID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Product updated successfully');
      navigate('/adminpanel/productslist');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container-fluid d-flex justify-content-center'>
        <div className="card col-11 mt-5">
          <div className='card-header bg-dark text-white d-flex justify-content-between'>
            <div className=''>
              Edit Product
            </div>
            <div data-bs-theme="dark">
              <a type="button" className="btn-close" aria-label="Close" href='/adminpanel/productslist'></a>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Name</label>
                <input type="text" className="form-control" id="productName" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Price</label>
                <input type="number" className="form-control" id="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">Description</label>
                <textarea className="form-control" 
                          id="productDescription" 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)}
                          rows={5} // Set the number of rows (adjust as needed)
                          />
              </div>
              <div className="mb-3">
                <label htmlFor="productCategory" className="form-label">Category</label>
                <select
                  className="form-select"
                  id="productCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue></option>
                  <option value='Swimwear'>Vestidos de Baño</option>
                  <option value='Sets'>Sets</option>
                  <option value='Clothes/Accesories'>Ropa y Accesorios</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productSubcategory" className="form-label">Subcategory</label>
                <select
                  className="form-select"
                  id="productSubcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option defaultValue></option>
                  <option value='One Piece'>Una Pieza</option>
                  <option value='Two Piece'>Dos Piezas</option>
                  <option value='Crochet'>Crochet</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">Image</label>
                <input type="file" className="form-control" id="productImage" onChange={handleImageChange} />
                <div className='d-flex justify-content-center mt-3 mb-3'>
                  {imagePreview && (
                    <img src={imagePreview} alt="Product Preview" className="mt-2" style={{ maxWidth: '200px' }} />
                  )}
                </div>
              </div>
              <div className='d-flex justify-content-center mt-4 '>
                <button type="submit" className="btn btn-dark ps-4 pe-4">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
