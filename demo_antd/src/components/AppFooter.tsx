import { Layout, Typography, theme } from 'antd'

const { Footer } = Layout
const { Text } = Typography

export default function AppFooter() {
    const { token } = theme.useToken()

    return (
        <Footer style={{
            textAlign: 'center',
            padding: '12px 2rem',
            background: token.colorBgContainer,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
        }}>
            <Text type="secondary" style={{ fontSize: '0.8rem' }}>
                Demo of importing <code>gui4vega_react</code>
            </Text>
        </Footer>
    )
}
