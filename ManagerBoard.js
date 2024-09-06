import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faList,
  faSearch,
  faBoxes
} from "@fortawesome/free-solid-svg-icons";
import "./SharedStyles.css";

const ManagerBoard = () => {
  const navigate = useNavigate();

  const managerFunctions = [
    { path: "/create-quotation", title: "Create Quotation", icon: faFileInvoiceDollar },
    { path: "/get-quotation", title: "View Quotation", icon: faList },
    { path: "/view-product-by-name-mgr", title: "View Products By Name", icon: faSearch },
    { path: "/view-all-products-mgr", title: "View All Products", icon: faBoxes },
  ];

  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center dashboard-header">Manager Dashboard</h1>
        </Col>
      </Row>
      <Row>
        {managerFunctions.map((func, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
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

export default ManagerBoard;