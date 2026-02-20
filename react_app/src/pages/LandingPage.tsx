import { useNavigate } from 'react-router-dom'
import { Layout, Typography, Button, Flex } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

const { Content } = Layout
const { Title, Paragraph } = Typography

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content>
                <Flex vertical align="center" justify="center" gap="large" style={{ minHeight: 'calc(100vh - 52px - 53px)', padding: '4rem 2rem', textAlign: 'center' }}>
                    <Title style={{ margin: 0 }}>Vega GUI</Title>
                    <Paragraph type="secondary" style={{ maxWidth: 520, fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
                        A modular, importable graphical interface for building and editing
                        Vega grammar specifications. Compose visualizations through a
                        structured, component-driven editor without writing JSON by hand.
                    </Paragraph>
                    <Button type="primary" size="large" onClick={() => navigate('/editor')}>
                        Open Editor
                    </Button>
                </Flex>
            </Content>
            <AppFooter />
        </Layout>
    )
}
