import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import VirgiliosResume from "../../../../public/VirgiliosResume.pdf";
import SonysResume from "../../../../public/SonysResume.pdf";
import VirgilioImage from "../../../../public/virgilio-img.png";
import SonyImage from "../../../../public/sony-img.png";

export const About = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const handleResumeClick = (resume, name) => {
    setSelectedResume(resume);
    setSelectedName(name);
    if (window.innerWidth <= 768) {
      window.location.href = resume; // Redirect to the selected resume page
    }
  };

  const handleModalOpen = (resume, name) => {
    setSelectedResume(resume);
    setSelectedName(name);
  };

  const handleModalClose = () => {
    setSelectedResume(null);
    setSelectedName(null);
  };

  return (
    <div className="text-center mt-5 container">
      <h2>About Us</h2>
      <div className="row mt-4">
        {/* First Card */}
        <div className="col-md-6">
          <Card>
            <Card.Img variant="top" src={VirgilioImage} alt="Virgilio Macero" style={{ height: "400px" }} />
            <Card.Body>
            <Card.Title style={{ fontSize: '28px' }}>Virgilio Macero</Card.Title>
              <div className="d-flex justify-content-around">
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" href="https://www.linkedin.com/in/virgilio-macero/">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </Button>
                  <span>LinkedIn</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" onClick={() => handleResumeClick(VirgiliosResume, "Virgilio Macero")}>
                    <i className="far fa-file-alt fa-2x"></i>
                  </Button>
                  <span>Resume</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" href="https://github.com/VirgilioMacero">
                    <i className="fab fa-github fa-2x"></i>
                  </Button>
                  <span>Github</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* Second Card */}
        <div className="col-md-6">
          <Card>
            <Card.Img variant="top" src={SonyImage} alt="Sony Raymond" style={{ height: "400px", width: "" }} />
            <Card.Body>
            <Card.Title style={{ fontSize: '28px' }}>Sony Raymond </Card.Title>
              <div className="d-flex justify-content-around">
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" href="https://www.linkedin.com/in/wilclerson/">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </Button>
                  <span>LinkedIn</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" onClick={() => handleResumeClick(SonysResume, "Sony Raymond")}>
                    <i className="far fa-file-alt fa-2x"></i>
                  </Button>
                  <span>Resume</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" href="https://github.com/Wilclerson/">
                    <i className="fab fa-github fa-2x"></i>
                  </Button>
                  <span>Github</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* Resume Modal */}
      <Modal show={selectedResume !== null} onHide={handleModalClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedName}'s Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed src={selectedResume} type="application/pdf" width="100%" height="650px" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" href={selectedResume} download>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
