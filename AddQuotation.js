import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const AddQuotation = () => {
  const [formData, setFormData] = useState({
    productId: "", // Stores the selected product ID
    featureId: "", // Stores the selected feature ID
    amount: 0, // Changed from totalAmount to amount
    quantity: 0,
    totalAmount: 0, // Total amount to be displayed
  });
  const [products, setProducts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await UserService.getall(); // Fetch all products
        setProducts(response.data); // Assuming response contains an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch features based on selected productId
    const fetchFeatures = async () => {
      try {
        if (formData.productId) {
          const response = await UserService.getfeaturebyproductid(formData.productId); // Fetch features by productId
          setFeatures(response.data); // Assuming response contains an array of features
        } else {
          setFeatures([]); // Reset features if no productId selected
        }
      } catch (error) {
        console.error("Error fetching features:", error);
        setError("Error fetching features. Please try again later.");
      }
    };

    fetchFeatures();
  }, [formData.productId]); // Execute whenever productId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "amount" || name === "quantity") {
      calculateTotalAmount({ ...formData, [name]: parseFloat(value) }); // Pass updated form data
    }
  };

  const calculateTotalAmount = ({ amount, quantity }) => {
    const total = parseFloat(amount) * parseInt(quantity);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total.toFixed(2), // Ensure total amount has two decimal places
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await UserService.addquotation(formData); // Submit quotation data
      setSuccess(true); // Set success message
      setError(null); // Clear error message
    } catch (error) {
      console.error("Error adding quotation:", error);
      if (
        (error.response && error.response.status === 404) ||
        (error.response && error.response.status === 500)
      ) {
        setError("Product or user ID is invalid."); // Handle specific errors
      } else {
        setError("Error adding quotation."); // Generic error message
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 rounded">
            <h2 className="mb-4">Add Quotation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productId">Product Name:</label>
                <select
                  className="form-control"
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Product --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="featureId">Product Feature:</label>
                <select
                  className="form-control"
                  id="featureId"
                  name="featureId"
                  value={formData.featureId}
                  onChange={handleChange}
                  required
                  disabled={!formData.productId} // Disable if no productId selected
                >
                  <option value="">-- Select Feature --</option>
                  {features.map((feature) => (
                    <option key={feature.id} value={feature.id}>
                      {feature.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalAmount">Total Amount:</label>
                <input
                  type="text"
                  className="form-control"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Quotation
              </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && (
              <p className="text-success mt-3">Quotation added successfully.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuotation;
