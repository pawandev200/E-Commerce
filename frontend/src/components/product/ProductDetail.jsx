import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";
import RelatedProduct from "./RelatedProduct";
import { useNavigate } from "react-router-dom";


const ProductDetail = () => {
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate(); // used when we need to navigate from this page to another pages
  const [product, setProduct] = useState();
  const { id } = useParams();  //taking the id of selected product and passing it to api to get details
  const url = "http://localhost:3000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
    //   console.log(api.data.product);
    setProduct(api.data.product)
      //   setProducts(api.data.products);
    };
    fetchProduct();
  }, [id]);
  // showing the details of product that is currently fetched after that related product
  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{ width: "250px", height: "250px",borderRadius:'10px',border:"2px solid yellow" }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>
            {product?.price}{" "}
            {"₹"}
          </h1>
          {/* <h3>{product.category}</h3> */}
          <div className="my-5">

            {/* Buy button: when clicked it's navigate to checkout page */}
            <button
            className="btn btn-danger mx-3" 
            style={{fontWeight:'bold'}}
            onClick={() => navigate("/shipping")}>Buy Now</button>

            {/* <button className="btn btn-warning" style={{fontWeight:'bold'}}>Add To Cart</button> */}
            {/* add to cart button: when clicked item added to cart */}
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

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;