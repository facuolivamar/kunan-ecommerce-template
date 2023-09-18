import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FeatureProduct({ postId }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Define the JSONPlaceholder API URL based on the postId prop
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    // Make the GET request to fetch product data
    axios.get(apiUrl)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching product data for post ${postId}:`, error);
      });
  }, [postId]);

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={Image}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{product.title}</h5>
          <p className="card-text text-center text-muted">{product.body}</p>
          <p className="card-text text-center text-muted">Acá va el precio, y el body deberia ser reemplazado</p>
          <div className="d-grid gap-2">
            <Link to={`/products/${postId}`} className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;