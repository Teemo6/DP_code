import { useNavigate } from 'react-router-dom'
import { Layout, Typography, Space, Flex, theme, Switch, ColorPicker } from 'antd'
import { AreaChartOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.ts'

const { Header } = Layout
const { Text, Link } = Typography

export default function AppHeader() {
    const navigate = useNavigate()
    const { token } = theme.useToken()
    const { isDark, toggleTheme, primaryColor, setPrimaryColor } = useContext(ThemeContext)

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 52,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}>
            <Flex align="center" gap="small" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <AreaChartOutlined style={{ fontSize: 18, color: token.colorText }} />
                <Text strong style={{ fontSize: '1rem' }}>GUI 4 Vega</Text>
            </Flex>
            <Flex align="center" gap="large">
                <Flex align="center" gap="small">
                    <Text type="secondary">Primary Color:</Text>
                    <ColorPicker
                        value={primaryColor}
                        onChange={(_, hex) => setPrimaryColor(hex)}
                        size="small"
                    />
                    <Switch
                        checked={isDark}
                        onChange={toggleTheme}
                        checkedChildren={<BulbFilled />}
                        unCheckedChildren={<BulbOutlined />}
                    />
                </Flex>
                <Space size="middle">
                    <Link style={{ color: token.colorText }} onClick={() => navigate('/')}>Home</Link>
                    <Link style={{ color: token.colorText }} onClick={() => navigate('/editor')}>Editor</Link>
                    <Link href="https://vega.github.io/vega/" target="_blank">Vega</Link>
                    <Link href="https://ant.design/" target="_blank">Ant Design</Link>
                </Space>
            </Flex>
        </Header>
    )
}