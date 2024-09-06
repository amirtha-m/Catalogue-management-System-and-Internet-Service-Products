import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

const UpdateQuotationForm = () => {
  const { quotationId } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await UserService.getquotationbyid(quotationId);
        setQuotation(response.data);
      } catch (error) {
        console.error(`Error fetching quotation with ID ${quotationId}:`, error);
        setError("Error fetching quotation. Please try again later.");
      }
    };

    fetchQuotation();
  }, [quotationId]);

  const handleUpdateQuotation = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update quotation with the entire quotation object
      await UserService.updatequotation(quotation);

      // Navigate back to view all quotations page after update
      window.location.href = "/get-quotation"; // Redirect to view all quotations
    } catch (error) {
      console.error(`Error updating quotation with ID ${quotationId}:`, error);
      setError("Error updating quotation. Please try again later.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuotation(prevQuotation => ({
      ...prevQuotation,
      [name]: value
    }));
  };

  if (!quotation) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 rounded">
            <h2 className="mb-4"> Apply Discount</h2>
            <form onSubmit={handleUpdateQuotation}>
              {/* Product Name (hidden) */}
              <div className="form-group d-none">
                <label htmlFor="productId">Product Name:</label>
                <input
                  type="text"
                  id="productId"
                  className="form-control"
                  value={quotation.productId} // Assuming productId is fetched or derived
                  readOnly
                />
              </div>
              {/* Feature Name (hidden) */}
              <div className="form-group d-none">
                <label htmlFor="featureId">Feature Name:</label>
                <input
                  type="text"
                  id="featureId"
                  className="form-control"
                  value={quotation.featureId} // Assuming featureId is fetched or derived
                  readOnly
                />
              </div>
              {/* Total Amount */}
              <div className="form-group">
                <label htmlFor="totalAmount">Total Amount:</label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  className="form-control"
                  value={quotation.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Quantity */}
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  value={quotation.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Submit Button */}
              <button type="submit" className="btn btn-primary mr-2">
                Update
              </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuotationForm;