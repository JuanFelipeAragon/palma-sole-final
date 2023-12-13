import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';
// import Discount from '../../components/carousel/discount';
import { useCart } from '../../CartContext';

const Shop = () => {
  const { listProducts, handleQuantityChange, addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(listProducts);
  const categories = [...new Set(listProducts.map(product => product.category))];
  const subcategories = [...new Set(listProducts.map(product => product.subcategory))];

  

  const navigate = useNavigate();

  const filterByCategory = (selectedCategory) => {
    if (selectedCategory === 'All') {
      setFilteredProducts(listProducts);
    } else {
      const filteredByCategory = listProducts.filter(product => product.category === selectedCategory);
      setFilteredProducts(filteredByCategory);
    }
  };

  const filterBySubcategory = (selectedSubcategory) => {
    if (selectedSubcategory === 'All') {
      setFilteredProducts(listProducts);
    } else {
      const filteredBySubcategory = listProducts.filter(product => product.subcategory === selectedSubcategory);
      setFilteredProducts(filteredBySubcategory);
    }
  };

  const filterByName = (searchTerm) => {
    const filteredByName = listProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredByName);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    filterByName(searchTerm);
  };

  const filterByPriceRange = (minPrice, maxPrice) => {
    const filteredByPriceRange = listProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    setFilteredProducts(filteredByPriceRange);
  };

  const goToDetail = (authorID) => {
    navigate("/product/" + authorID);
}


  const renderProducts = () => {
    return filteredProducts.map((product) => (
      <div key={product.id} className="d-flex justify-content-center mb-5">
        <div className="card text-center  ">
          <img src={product.image} className="card-img-top" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">
              <span>{product.name}</span>
            </h5>
            <p className="card-text fw-bold">
              Price : <span className='fw-normal ms-1'>US$ {product.price}</span>
            </p>
            <div className=" mb-3">
              <label className='fw-bold mb-2' htmlFor=''>Quantity:</label>
              <div className='d-flex p-0 ms-5 me-5'>
                <input
                  type="number"
                  className="form-control text-center"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className='d-flex justify-content-center mt-3 mb-3'>
                  <button onClick={() => goToDetail(product.id)} className="btn btn-dark ms-1">
                  <i className="bi bi-info-circle-fill"></i> View
                  </button>
                <div>
                  <button onClick={() => addToCart(product.id)} className="btn btn-primary ms-1">
                    <i className="bi bi-bag-plus me-2"></i>Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* <Discount/> */}
      <Navbar />
      
      <div className="container-fluid col-11 d-flex justify-content-center align-items-center mt-5 mb-5 ">
        <div className='row card '>
            <div className='card-body '>
                <div className="input-group d-flex justify-content-center ">
                  <div className='d-flex mb-3'>
                    <span className="input-group-text text-bg-dark ">Search :</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={handleSearch}
                      />

                  </div>
                  {/* Dropdown button for filtering by category */}
                  <div className="dropdown mb-3 ms-3 me-3">
                    <button className="btn btn-secondary dropdown-toggle text-bg-dark" type="button" id="categoryDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Category
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="categoryDropdownButton">
                      <li key='allCategories'>
                        <button className="dropdown-item" onClick={() => filterByCategory('All')}>All</button>
                      </li>
                      {categories.map((category) => (
                        <li key={category}>
                          <button className="dropdown-item" onClick={() => filterByCategory(category)}>{category}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Dropdown button for filtering by subcategory */}
                  <div className="dropdown mb-3">
                    <button className="btn btn-secondary dropdown-toggle text-bg-dark" type="button" id="subcategoryDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Subcategory
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="subcategoryDropdownButton">
                      <li key='allSubcategories'>
                        <button className="dropdown-item" onClick={() => filterBySubcategory('All')}>All</button>
                      </li>
                      {subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <button className="dropdown-item" onClick={() => filterBySubcategory(subcategory)}>{subcategory}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="dropdown mb-3 ms-3">
                    <button className="btn btn-secondary dropdown-toggle text-bg-dark" type="button" id="priceRangeDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Price
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="priceRangeDropdownButton">
                      <li>
                        <button className="dropdown-item" onClick={() => filterByPriceRange(0, 50)}>Under $50</button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => filterByPriceRange(51, 100)}>$50 - $100</button>
                      </li>
                      {/* Add more buttons for other price ranges as needed */}
                    </ul>
                  </div>
                </div>
                {/* Render filtered products */}
                <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4  ">
                  {renderProducts()}
                </div>
            </div>
            
        </div>
      </div>
      
      <BNavbar />
    </>
  );
  
};

export default Shop;
