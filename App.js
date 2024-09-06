import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";

import DeleteFeature from "./components/DeleteFeature";
import DeleteParameter from "./components/DeleteParamater";
import DeleteProduct from "./components/DeleteProduct";

import ViewAllProducts from "./components/ViewAllProducts";
import UpdateProductForm from "./components/UpdateProductForm";
import UserBoard from "./components/UserBoard";
import ViewAllproductsuser from "./components/ViewAllproductsuser";
import ProductByName from "./components/ProductByName";
import ManagerBoard from "./components/ManagerBoard";
import ViewAllProductsMgr from "./components/ViewallProductsMgr";
import ViewProductByIdMgr from "./components/ViewProductByIdMgr";

import ViewProductsByIdadmin from "./components/ViewProductsByIdadmin";
import AddQuotation from "./components/AddQuotation";
import ProductByNameadmin from "./components/ProductByNameadmin";
import ProductByNamemgr from "./components/ProductByNamemgr";
import UpdateRole from "./components/UpdateRole";
import Homepage from "./components/Homepage";
import AddProductAndFeatures from "./components/AddProductandFeatures";
import ViewAllQuotation from "./components/ViewAllQuotations";
import UpdateQuotation from "./components/UpdateQuotation";



const App = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowUserBoard(user.role.includes("ROLE_CUSTOMER"));
      setCurrentUser(user);
      setShowManagerBoard(user.role.includes("ROLE_MANAGER"));
      setCurrentUser(user);
      setShowAdminBoard(user.role.includes("ROLE_ADMIN"));
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowUserBoard(false);
    setShowManagerBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand d-flex align-items-center">
            <span className="fs-4 fw-bold text-light me-2">CMS</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"view-product"} className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {showManagerBoard && (
                <li className="nav-item">
                  <Link to={"/manager"} className="nav-link">
                    Manager Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {showUserBoard && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link" onClick={logOut}>
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-link">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/delete-param" element={<DeleteParameter />} />
          <Route path="/delete-feature" element={<DeleteFeature />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
          <Route path="/view-product" element={<ViewAllProducts />} />
          <Route path="/view-productbyid-admin" element={<ViewProductsByIdadmin />} />
          <Route path="/update-product" element={<UpdateProductForm />} />
          <Route path="/user" element={<UserBoard />} />
          <Route path="/view-all-products" element={<ViewAllproductsuser />} />
          <Route path="/view-products-by-name" element={<ProductByName />} />
          <Route path="/view-productbyname-admin" element={<ProductByNameadmin />} />
          <Route path="/view-product-by-name-mgr" element={<ProductByNamemgr />} />
          <Route path="/manager" element={<ManagerBoard />} />
          <Route path="/view-all-products-mgr" element={<ViewAllProductsMgr />} />
          <Route path="/view-product-by-id-mgr" element={<ViewProductByIdMgr />} />
          <Route path="/create-quotation" element={<AddQuotation />} />
          <Route path="/get-quotation" element={<ViewAllQuotation/>} />
          <Route path="/updaterole" element={<UpdateRole />} />
          <Route path="/add-products" element={<AddProductAndFeatures />} />
          <Route exact path="/update-quotation/:quotationId" element={<UpdateQuotation/>} />
          </Routes>
      </div>
    </div>
  );
};

export default App;