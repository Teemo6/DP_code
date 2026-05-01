import { Container, Navbar, Row, Col, Form } from 'react-bootstrap'
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
                    <Navbar.Brand>GUI 4 Vega Bootstrap Demo</Navbar.Brand>
                    <Form className="d-flex ms-auto">
                        <Form.Check
                            type="switch"
                            id="theme-switch"
                            label={isDark ? "Dark Mode" : "Light Mode"}
                            className="text-white"
                            checked={isDark}
                            onChange={() => setIsDark(!isDark)}
                        />
                    </Form>
                </Container>
              </Navbar>

              <Container fluid className="px-4">
                  <Row>
                      <Col md={3} className="border-end vh-100 p-3">
                            <h5 className="mb-3">Example inconvenient sidebar</h5>

                            <div className="mt-4 small text-muted">
                                Purpose of this sidebar is to show that the <code>VegaEditor</code> component can be used in a layout with other components, even if the layout is taking up some space.
                            </div>
                      </Col>

                      <Col md={7} className="p-3">
                          <h2>Vega Editor Integration</h2>
                          <p className="text-muted">A minimal example showing the <code>VegaEditor</code> component from <code>@relisa/gui4vega</code>.</p>

                          <div className="border rounded p-2" style={{ height: '75vh', width: '70vw' }}>
                              { /* VegaEditor component here from @relisa/gui4vega */ }
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