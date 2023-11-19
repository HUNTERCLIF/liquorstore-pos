import React, { useState } from 'react';
const ProductCatalog = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);

  const products = [
    { id: 1, name: 'Whiskey', price: 30.99, image: 'whiskey.jpg', code: 'W001' },
    { id: 2, name: 'Chrome', price: 25.99, image: 'Chrome.jpg', code: 'V002' },
    
  ];

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) || product.code.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredProducts(null);
  };

  const renderProduct = (product) => (
    <div key={product.id} className="col-md-4 mb-3">
      <div className="card">
        <img src={product.image} alt={product.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Price: ${product.price}</p>
          <p className="card-text">Code: {product.code}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    const productsToRender = filteredProducts || products;
    return productsToRender.map(renderProduct);
  };

  return (
    <div>
      <h2>Product Catalog</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={resetSearch}>
            Reset
          </button>
        </div>
      </div>

      <div className="row">{renderProducts()}</div>
    </div>
  );
};

export default ProductCatalog;
