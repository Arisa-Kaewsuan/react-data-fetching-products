import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [post, setPost] = useState([]);

  const handleDelete = async (id) => {
    const resule = await axios.delete(`http://localhost:4001/products/${id}`);
    const newresule = post.filter((post) => post.id !== id);
    setPost(newresule);
  };

  const getpost = async () => {
    const response = await axios.get("http://localhost:4001/products");
    console.log(response.data);
    setPost(response.data.data);
  };
  useEffect(() => {
    getpost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {post.map((item) => (
          <div className="product" key={item.id}>
            <div className="product-preview">
              <img
                src="https://via.placeholder.com/350/350"
                alt={item.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {item.name}</h1>
              <h2>Product price: {item.price}</h2>
              <p>Product description: {item.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(item.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
