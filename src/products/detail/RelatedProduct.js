import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes to define prop types
import Image from "../../nillkin-case-1.jpg";

function RelatedProduct(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;

  // Define state variables to store product details
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the JSONPlaceholder API URL based on the product ID passed as a prop
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${props.productId}`;

    // Make the GET request to fetch product data
    axios
      .get(apiUrl)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching product data for ID ${props.productId}:`, error);
        setLoading(false);
      });
  }, [props.productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the product details
  return (
    <Link
      to={`/products/${props.productId}`} // Use the product ID as part of the URL
      className="col text-decoration-none"
    >
      <div className="card shadow-sm">
        {percentOff}
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt=""
          // src={product.image} // Use the product image if available
          src={Image} // Use the product image if available
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product.title} {/* Display the product title */}
          </h5>
          <p className="card-text text-center text-muted">{offPrice}</p>
        </div>
      </div>
    </Link>
  );
}

// Define prop types for the RelatedProduct component
RelatedProduct.propTypes = {
  productId: PropTypes.number.isRequired, // Ensure productId is a required number prop
};

export default RelatedProduct;
