import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCog, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'features', 'about', 'testimonials'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
        
        // Add this part for parallax effect
        const yOffset = window.pageYOffset;
        document.getElementById(currentSection).style.backgroundPositionY = `${yOffset * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      <section id="intro" className={`py-5 section ${activeSection === 'intro' ? 'active' : ''}`}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img src="/images.jpg" alt="Intro" className="img-fluid rounded animate-fade-in" />
            </Col>
            <Col md={6}>
              <h1 className="text-primary fw-bold mb-4 animate-slide-in">
                Catalogue Management System for Internet Service Products
              </h1>
              <p className="lead mb-4 animate-fade-in">
                Welcome to the Catalogue Management System (CMS), your premier
                platform for efficient management and display of internet service
                products. Designed to meet the diverse needs of telecom giants
                like AT&T, Verizon, and T-Mobile, our CMS provides a robust
                solution for administrators and managers alike.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="features" className={`py-5 bg-light section ${activeSection === 'features' ? 'active' : ''}`}>
        <Container>
          <h2 className="text-center mb-5 animate-fade-in">Key Features</h2>
          <Row>
            {[
              { icon: faDatabase, title: 'Comprehensive Product Management', description: 'Easily manage and organize your entire product catalogue.' },
              { icon: faCog, title: 'Detailed Specifications', description: 'Handle complex product specifications with ease.' },
              { icon: faChartLine, title: 'Powerful Reporting Tools', description: 'Generate insightful reports to drive business decisions.' },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 feature-card animate-slide-up">
                  <Card.Body className="text-center">
                    <FontAwesomeIcon icon={feature.icon} size="3x" className="mb-3 text-primary" />
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="about" className={`py-5 section ${activeSection === 'about' ? 'active' : ''}`}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="order-md-2">
              <div className="about-image rounded-circle overflow-hidden animate-fade-in">
                <img src="/R.png" alt="About CMS" className="img-fluid" />
              </div>
            </Col>
            <Col md={6} className="order-md-1">
              <div className="about-content bg-white p-4 rounded shadow-sm animate-slide-in">
                <h2 className="text-primary fw-bold mb-4">About Us</h2>
                <p className="lead mb-4">
                  At CMS, we understand the challenges businesses face in organizing and
                  optimizing their product catalogues. Our mission is to simplify this
                  process through innovative technology and user-centric solutions.
                </p>
                <p className="mb-4">
                  With a focus on efficiency and ease of use, CMS offers a comprehensive
                  suite of features designed to enhance your catalogue management experience.
                </p>
                <Button variant="primary">Learn More <FontAwesomeIcon icon={faArrowRight} className="ms-2" /></Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="testimonials" className={`py-5 bg-light section ${activeSection === 'testimonials' ? 'active' : ''}`}>
        <Container>
          <h2 className="text-center mb-5 animate-fade-in">What Our Clients Say</h2>
          <Row>
            {[
              { name: 'John Doe', company: 'TechCorp', text: 'CMS has revolutionized how we manage our product catalogue. Highly recommended!' },
              { name: 'Jane Smith', company: 'TelecomGiants', text: 'The efficiency gains we have seen with CMS are remarkable. Its a game-changer.' },
            ].map((testimonial, index) => (
              <Col md={6} key={index}>
                <Card className="h-100 testimonial-card animate-slide-up">
                  <Card.Body>
                    <Card.Text>"{testimonial.text}"</Card.Text>
                    <footer className="blockquote-footer mt-3">
                      {testimonial.name} from <cite title="Source Title">{testimonial.company}</cite>
                    </footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Catalogue Management System</h5>
              <p>Streamlining telecom product management</p>
            </Col>
            <Col md={6}>
              <h5>Contact Us</h5>
              <p>Email: info@cms.com</p>
              <p>Phone: (123) 456-7890</p>
            </Col>
          </Row>
          <hr />
          <p className="text-center mb-0">&copy; 2024 Catalogue Management System. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;