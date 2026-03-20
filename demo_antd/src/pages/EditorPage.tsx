import { useRef, useState } from 'react'
import { VegaEditor, ExternalSelectionExporter, ExportedContent } from '@relisa/gui4vega'
import type { ExportedData, VegaEditorRef } from '@relisa/gui4vega'
import { Layout, Typography, theme, Flex, Button } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

// import spec from '../../json/invalid.json'
import schema from '../../../json/anti/02_too_long_sprint.json'
import { datasets, signals } from '../assets/import'

const { Content } = Layout
const { Title, Paragraph } = Typography

export default function EditorPage() {
    // Access Ant Design theme token
    const { token } = theme.useToken()

    // State to hold the exported specification and selected datasets from the VegaEditor
    const [exported, setExported] = useState<ExportedData>({spec: '', datasets: [], signals: []})

    // State to hold the current code for SelectionExporter
    const [currentCode, setCurrentCode] = useState<string>('')

    // Ref for VegaEditor to access its methods
    const editorRef = useRef<VegaEditorRef>(null)

    // State to control ExternalSelectionExporter modal
    const [isExternalExporterOpen, setExternalExporterOpen] = useState(false)

    // Handler for user-defined export button
    const handleUserExportClick = () => {
        if (editorRef.current) {
            const code = editorRef.current.getCode()
            setCurrentCode(typeof code === 'string' ? code : JSON.stringify(code, null, 2))
            setExternalExporterOpen(true)
        }
    }

    // Handler for external export
    const handleExternalExport = (data: ExportedData) => {
        console.log('Library user now has acces to the exported data.')
        setExported(data)
    }

    return (
        <Layout>
            <AppHeader />
            <Flex vertical align="center" gap="small" style={{ padding: '24px 32px 16px', borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
                <Title level={3}>Visual Specification Editor</Title>
                <Paragraph type="secondary" style={{ maxWidth: 600, textAlign: 'center' }}>
                    Below this paragraph is the imported VegaEditor component from the <code>gui4vega_react</code> library.
                    Edit the JSON specification on the left and see the rendered visualization on the right.
                </Paragraph>
            </Flex>

            <Content style={{ padding: "0 32px" }}>
                <VegaEditor
                    ref={editorRef}
                    height="700px"
                    // importedData={{schema: schema, datasets: datasets, signals: signals}}
                />

                <Flex vertical align="center" gap="small" style={{ padding: '24px 0px 16px', borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
                    <Paragraph type="secondary" style={{ maxWidth: 600, textAlign: 'center' }}>
                        This is no longer content of the VegaEditor, but part of this demo page.
                        Below this paragraph are the results of exporting the JSON specification and selected datasets using the export functionality of the VegaEditor.
                    </Paragraph>
                </Flex>

                <Button onClick={handleUserExportClick}>
                    User Export via ExternalSelectionExporter
                </Button>

                <ExternalSelectionExporter
                    code={currentCode}
                    isOpen={isExternalExporterOpen}
                    onClose={() => setExternalExporterOpen(false)}
                    onExport={handleExternalExport}
                />

                <ExportedContent data={exported} />
            </Content>
            <AppFooter />
        </Layout>
    )
}