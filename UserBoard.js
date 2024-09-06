import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SharedStyles.css";

const UserBoard = () => {
  const navigate = useNavigate();

  const userFunctions = [
    { path: "/view-all-products", title: "View All Products", icon: faBoxes },
    { path: "/view-products-by-name", title: "View Products by Name", icon: faSearch },
  ];

  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center dashboard-header">User Dashboard</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {userFunctions.map((func, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={4} className="mb-4">
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

export default UserBoard;