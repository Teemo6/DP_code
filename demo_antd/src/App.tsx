import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import { useState } from 'react';
import { ThemeContext } from './context/ThemeContext.ts';

function App() {
    // Theme state management
    const [isDark, setIsDark] = useState(false);

    // Primary color state management
    const [primaryColor, setPrimaryColor] = useState('#1677ff');

    // Toggle between light and dark themes
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, primaryColor, setPrimaryColor }}>
            <ConfigProvider theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: { colorPrimary: primaryColor }
            }}>
                <AntdApp>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/editor" element={<EditorPage />} />
                        </Routes>
                    </BrowserRouter>
                </AntdApp>
            </ConfigProvider>
        </ThemeContext.Provider>
    )
}

export default App