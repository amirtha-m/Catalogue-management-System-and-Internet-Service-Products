import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faPuzzlePiece,
  faList,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/user.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Allproducts.css';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await UserService.getall();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-dark">
        <FontAwesomeIcon icon={faBox} className="me-2" /> Our Products
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" /> {error}
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <TransitionGroup component={null}>
          {products.map((product) => (
            <CSSTransition key={product.id} classNames="fade" timeout={500}>
              <div className="col">
                <div className="card h-100 product-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <FontAwesomeIcon icon={faBox} className="me-2 icon-color" />
                      {product.name}
                    </h3>
                  </div>
                  <div className="card-body">
                    {product.features.map((feature) => (
                      <div key={feature.id} className="mb-3">
                        <h4 className="feature-title">
                          <FontAwesomeIcon icon={faPuzzlePiece} className="me-2 icon-color" />
                          {feature.name}
                        </h4>
                        <h5 className="parameters-title">
                          <FontAwesomeIcon icon={faList} className="me-2 icon-color" />
                          Parameters
                        </h5>
                        <ul className="list-group">
                          {feature.parameters.map((parameter) => (
                            <li key={parameter.id} className="list-group-item bg-transparent border-light">
                              <strong>{parameter.name}:</strong> {parameter.value}
                              <span className="badge bg-light text-dark ms-2">{parameter.type}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default ViewAllProducts;