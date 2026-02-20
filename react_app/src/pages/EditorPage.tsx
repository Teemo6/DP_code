import { VegaEditor } from 'gui4vega_react'
import { useNavigate } from 'react-router-dom'
import './EditorPage.css'

export default function EditorPage() {
    const navigate = useNavigate()

    return (
        <div className="editor-layout">
            <header className="editor-header">
                <span className="editor-header__logo" onClick={() => navigate('/')}>Vega GUI</span>
            </header>
            <main className="editor-main">
                <VegaEditor />
            </main>
        </div>
    )
}

