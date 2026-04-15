import { Container, Navbar, Nav, Row, Col, ListGroup, Form } from 'react-bootstrap'
import { VegaEditor } from '@relisa/gui4vega'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'

function App() {
    // State to track dark mode
    const [isDark, setIsDark] = useState(false)

    // Update bootstrap theme
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light')
    }, [isDark])

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
                                <Form className="d-flex">
                                    <Form.Check
                                        type="switch"
                                        id="theme-switch"
                                        label={isDark ? "Dark Mode" : "Light Mode"}
                                        className="text-white"
                                        checked={isDark}
                                        onChange={() => setIsDark(!isDark)}
                                    />
                                </Form>
                          </Navbar.Collapse>
                    </Container>
              </Navbar>

              <Container fluid className="px-4">
                  <Row>
                      <Col md={3} className="border-end vh-100 p-3">
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

                      <Col md={7} className="p-3">
                          <h2>Vega Editor Integration</h2>
                          <p className="text-muted">A minimal example showing the VegaEditor component from <code>@relisa/gui4vega</code>.</p>

                          <div className="border rounded p-2" style={{ height: '75vh', width: '70vw' }}>
                              <VegaEditor height="100%" theme={isDark ? 'dark' : 'light'} />
                          </div>
                      </Col>
                  </Row>
              </Container>

            <footer className="bg-dark text-white text-center py-2 mt-3">
                <Container>
                    <small>
                        Demo of importing <code>@relisa/gui4vega</code>
                    </small>
                </Container>
            </footer>
        </>
    )
}

export default App