import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faSearch,
  faEdit,
  faTrash,
  faUserEdit,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./SharedStyles.css";

const AdminBoard = () => {
  const navigate = useNavigate();

  const adminFunctions = [
    { path: "/add-products", title: "Add Product and Features", icon: faPlus },
    { path: "/view-product", title: "View Products", icon: faEye },
    { path: "/view-productbyname-admin", title: "View Products By Name", icon: faSearch },
    { path: "/update-product", title: "Update Products", icon: faEdit },
    { path: "/delete-product", title: "Delete Product", icon: faTrash },
    { path: "/delete-feature", title: "Delete Feature", icon: faTrash },

    { path: "/updaterole", title: "Update Role for User", icon: faUserEdit },
  ];

  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center dashboard-header">Admin Dashboard</h1>
        </Col>
      </Row>
      <Row>
        {adminFunctions.map((func, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <Card
              className="dashboard-card h-100"
              onClick={() => navigate(func.path)}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                <FontAwesomeIcon icon={func.icon} size="3x" className="mb-3 dashboard-icon" />
                <Card.Title>{func.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminBoard;