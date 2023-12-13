import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import { Link } from 'react-router-dom'; // Import Link


const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();

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
  
    if (image) { // Check if image exists before appending to FormData
      formData.append('image', image);
    }
  
    try {
      await axios.post('http://localhost:8000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created successfully');
      navigate('/adminpanel/productslist'); // Navigate to the list of products
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  


  return (
    <>

    <Navbar/>
    <div className='container-fluid d-flex justify-content-center'>

      <div className="card col-11 mt-5">
      <div className='card-header bg-dark text-white d-flex justify-content-between'>
        <div className=''>
          Product
        </div>
        <div data-bs-theme="dark">
          <a type="button" class="btn-close" aria-label="Close" href='/adminpanel/productslist'></a>
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
              <button type="submit" className="btn btn-dark ps-4 pe-4">Add </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateProduct;

