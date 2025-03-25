import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    setStatus("loading");

    try {
      const response = await axios.get("http://localhost:4001/products");
      setProducts(response.data.data);
      setStatus("complete");
    } catch (error) {
      console.error("Error fetching product data:", error);
      setStatus("failed");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      alert("Delete Product ID = " + productId + " !!");
    } catch (error) {
      console.error("Can't delete data", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {status === "loading" && (
        <div className="loading-message" style={{ textAlign: "center" }}>
          Loading...
        </div>
      )}
      {status === "failed" && (
        <div className="loading-message" style={{ textAlign: "center" }}>
          Fetching Error...
        </div>
      )}
      {products.map((product) => {
        return (
          <div key={product.id} className="product-list">
            <div className="product">
              <div className="product-preview">
                <img src={product.image} alt="some product" width="80" height="80" />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button className="delete-button" onClick={() => deleteProduct(product.id)}>
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
