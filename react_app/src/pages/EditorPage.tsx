import { VegaEditor } from 'gui4vega_react'
import { Layout, Typography, theme } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

// import spec from '../../json/invalid.json'
import spec from '../../json/anti/02_too_long_sprint.json'

const { Sider, Content } = Layout
const { Title, Paragraph } = Typography

export default function EditorPage() {
    const { token } = theme.useToken()

    return (
        <Layout>
            <AppHeader />
            <Layout.Content>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: '1.5rem 2rem 1rem',
                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                }}>
                    <Title level={3} style={{ margin: 0 }}>Visual Specification Editor</Title>
                    <Paragraph type="secondary" style={{ margin: 0, maxWidth: 600, textAlign: 'center' }}>
                        Write and preview Vega grammar specifications in real time.
                        Edit the JSON spec on the left and see the rendered visualization on the right.
                    </Paragraph>
                </div>
                <Layout>
                    <Sider width={32} style={{ background: token.colorBgLayout, borderRight: `1px solid ${token.colorBorderSecondary}` }} />
                    <Content>
                        <VegaEditor
                            height="700px"
                            initialSchema={spec}
                        />
                    </Content>
                    <Sider width={32} style={{ background: token.colorBgLayout, borderLeft: `1px solid ${token.colorBorderSecondary}` }} />
                </Layout>
            </Layout.Content>
            <AppFooter />
        </Layout>
    )
}
