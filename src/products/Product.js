import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../nillkin-case-1.jpg";

function Product(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;

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

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${props.productId}`} href="!#" replace>
          {percentOff}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
            // src={product.image} // Use the product image if available
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product.title} {/* Display the product title */}
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
