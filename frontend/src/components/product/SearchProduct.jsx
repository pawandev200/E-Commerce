import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useEffect } from "react";
import { Link ,useParams} from "react-router-dom";

// Component to search and display products based on a search term
const SearchProduct = () => {
    // Accessing the products from the global context
    const { products } = useContext(AppContext);
  
    // State to store the filtered products based on the search term
    const [searchProduct, setSearchProduct] = useState([]);
  
    // Extracting the search term from the URL parameters
    const { term } = useParams();
  
    // Effect to filter products whenever the search term or products list changes
    useEffect(() => {
      setSearchProduct(
        products.filter((data) => 
          data?.title?.toLowerCase().includes(term.toLowerCase())
        )
      );
    }, [term, products]);

  return (
    <>
    {/* Container to display the filtered products */}
      <div className="container text-center">
        <div className="container  d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {/* Mapping through the filtered products to display each one */}
            {searchProduct?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 
            d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                    {/* Link to navigate to the product details page */}
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
                      <button className="btn btn-warning">Add To Cart</button>
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

export default SearchProduct;