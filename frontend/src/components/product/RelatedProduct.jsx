import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Component to display related products based on the provided category
const RelatedProduct = ({ category }) => {
    // Extract products from AppContext and initialize relatedProduct state
  const { products, addToCart } = useContext(AppContext);
  const [realtedProduct, setRealtedProduct] = useState([]);

  // useEffect to filter products based on the provided category
  useEffect(() => {
    setRealtedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products]); // Re-run effect when category or products change

  return (
    <>
      <div className="container text-center">
        <h1>Related Product</h1>
        <div className="container  d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {realtedProduct?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 
            d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "10px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="my-3">
                      <button className="btn btn-primary mx-3">
                        {product.price} {"₹"}
                      </button>
                      {/* <button className="btn btn-warning">Add To Cart</button> */}
                      <button
                         className="btn btn-warning"
                         onClick={() =>
                         addToCart(
                         product._id,
                         product.title,
                         product.price,
                         1,
                         product.imgSrc )}>
                         Add To Cart
                      </button>                        
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;