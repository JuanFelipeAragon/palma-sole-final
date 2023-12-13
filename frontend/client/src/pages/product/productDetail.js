import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';

import { useCart } from '../../CartContext';


const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { productID } = params;

  const { handleQuantityChange, addToCart } = useCart();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/products/getOne/${productID}`);
        const fetchedProduct = result.data;

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          console.error('Product data not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductData();
  }, [productID]);

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-center align-items-center mt-5 col-11">
        {product && (
          <div className="card border-light mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-2">{product.name}</h5>
                  <div className="d-flex flex-column justify-content-between">
                    <p className="card-text">Price: US$ {product.price}</p>
                    <p className="card-text">{product.description}.</p>
                    <p className="card-text">
                      <label className='fw-semibold'>Quantity: </label>
                      <input
                        type="number"
                        className="form-control text-center small-input mt-2" // Added a class name 'small-input'
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                        min="1"
                        style={{width:'120px'}}
                      />
                    </p>
                    <p className="card-text">
                      <button onClick={() => addToCart(product.id)} className="btn btn-primary ps-3 pe-3">
                        <i className="bi bi-bag-plus me-2"></i>Add
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <BNavbar />
    </>
  );
};

export default ProductDetails;

  