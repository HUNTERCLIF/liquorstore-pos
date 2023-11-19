import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductCatalog from './ProductCatalog';
import CartManagement from './CartManagement';
import Quagga from 'quagga';
import Receipt from './Receipt';
import { Bar } from 'react-chartjs-2';
import './PointOfSale.css';
import { useCartContext } from '../CartContext';

const PointOfSale = ({ products: propProducts }) => {
  const memoizedProducts = useMemo(() => propProducts, [propProducts]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [salesData, setSalesData] = useState({});
  const { state } = useCartContext();
  const [filteredProducts, setFilteredProducts] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 



  const products = [
    { id: 1, name: 'Whiskey', price: 30.99, image: 'whiskey.jpg', code: 'W001' },
    { id: 2, name: 'Chrome', price: 25.99, image: 'vodka.jpg', code: 'V002' },
    //  more products......
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


  // Handle online/offline status!!!

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // synchronization of data logic when the connection is restored
    if (isOnline) {
      // Sync data with the backend(later...)
      console.log('Syncing data with the backend');
    }
  }, [isOnline, state]);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const generateSalesData = useCallback(() => {
    const salesCount = {};
    cart.forEach((item) => {
      const date = new Date().toLocaleDateString();
      const key = `${item.name} - ${date}`;
      salesCount[key] = salesCount[key] ? salesCount[key] + 1 : 1;
    });

    const labels = Object.keys(salesCount);
    const data = Object.values(salesCount);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Sales Count',
          data: data,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  }, [cart]);

  useEffect(() => {
    const initializeQuagga = async () => {
      try {
        await Quagga.init({
          //Quagga initialization settings
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#your-scanner-element'),
          },
          decoder: {
            readers: ['ean_reader', 'code_128_reader'], // barcoce specification and support 
          },
        });
        Quagga.start();
      } catch (err) {
        console.error('Error initializing Quagga:', err);
      }
    };

    initializeQuagga();

    Quagga.onDetected((data) => {
      const barcode = data.codeResult.code;
      const scannedProduct = memoizedProducts.find((product) => product.barcode === barcode);
      if (scannedProduct) {
        setSelectedProduct(scannedProduct);
        setQuantity(1);
        Quagga.stop();
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [memoizedProducts]);

  useEffect(() => {
    const updateSalesData = () => {
      setSalesData(generateSalesData());
    };

    updateSalesData();

    return () => {
      // Cleanup if needed
    };
  }, [cart, generateSalesData]);

  const addToCart = () => {
    if (selectedProduct && quantity > 0) {
      const item = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
      };

      setCart([...cart, item]);
      setSelectedProduct(null); // Resetting the selected product after adding to cart
      setQuantity(1);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const updateCart = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const processPayment = () => {
    // Implementing payment processing logic
    console.log('Processing payment:', cart);
    //sending the cart data to backend for processing
    setReceiptVisible(true);
  };

  return (
    <div>
      <h2>Point of Sale</h2>
  
      <div className="row">
        <div className="col-md-6">
          <h4>Product Catalog</h4>
          <div className="inputGroup mb-3">
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
          {/* Rendering ProductCatalog component */}
          <ProductCatalog products={filteredProducts || products} addToCart={addToCart} />
        </div>
  
        <div className="col-md-6">
          <CartManagement
            cart={cart}
            updateCart={updateCart}
            removeFromCart={removeFromCart}
          />
          <div className="form-group">
            <label>Selected Product:</label>
            <input
              type="text"
              value={selectedProduct ? selectedProduct.name : ''}
              readOnly
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            {/* button to trigger barcode scanning */}
            <button className="btn btn-info" onClick={() => Quagga.start()}>
              Scan Barcode
            </button>
            <button className="btn btn-success mt-2" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="btn btn-primary ml-2" onClick={processPayment}>
                  Process Payment
            </button>
          </div>
        </div>
      </div>
  
      {receiptVisible && (
        <Receipt cart={cart} totalAmount={calculateTotalAmount()} paymentDetails={{ method: 'Card', cardNumber: '**** **** **** 1234' }} />
      )}
  
      <div>
        <h4>Sales Report</h4>
        <Bar data={salesData} />
      </div>
    </div>
  );
};
export default PointOfSale;
