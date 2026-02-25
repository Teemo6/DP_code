import { Container, Navbar, Nav, Row, Col, ListGroup } from 'react-bootstrap'
import { VegaEditor } from 'gui4vega_react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Bootstrap App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="px-4">
        <Row>
          <Col md={3} className="bg-light border-end vh-100 p-3">
            <h5 className="mb-3">Examples</h5>
            <ListGroup>
              <ListGroup.Item action href="#simple">
                Simple Vega spec
              </ListGroup.Item>
              <ListGroup.Item action href="#bar">
                Bar chart
              </ListGroup.Item>
              <ListGroup.Item action href="#scatter">
                Scatter plot
              </ListGroup.Item>
              <ListGroup.Item action href="#load">
                Load spec
              </ListGroup.Item>
            </ListGroup>

            <div className="mt-4 small text-muted">
              This sidebar shows how to import and use the VegaEditor from your library.
            </div>
          </Col>

          <Col md={9} className="p-3">
            <h2>Vega Editor Integration</h2>
            <p className="text-muted">A minimal example showing the VegaEditor component from <code>gui4vega_react</code>.</p>

            <div className="border rounded p-2 bg-white" style={{ height: '70vh' }}>
              <VegaEditor height="100%" />
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-2 mt-3">
        <Container>
          <small>
              Demo of importing <code>gui4vega_react</code>
          </small>
        </Container>
      </footer>
    </>
  )
}

export default App
