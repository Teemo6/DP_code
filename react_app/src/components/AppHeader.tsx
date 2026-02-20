import { useNavigate } from 'react-router-dom'
import { Layout, Typography, Space, theme } from 'antd'
import { AreaChartOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Text, Link } = Typography

export default function AppHeader() {
    const navigate = useNavigate()
    const { token } = theme.useToken()

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            height: 52,
            lineHeight: '52px',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}>
            <Space align="center" size="small" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <AreaChartOutlined style={{ fontSize: 18 }} />
                <Text strong style={{ fontSize: '1rem' }}>Vega GUI</Text>
            </Space>
            <Space size="large">
                <Text
                    style={{ cursor: 'pointer', color: token.colorText }}
                    onClick={() => navigate('/')}
                >
                    Home
                </Text>
                <Text style={{ cursor: 'pointer', color: token.colorText }}>
                    <Link href="https://vega.github.io/vega/" target="_blank">Vega</Link>
                </Text>
            </Space>
        </Header>
    )
}
