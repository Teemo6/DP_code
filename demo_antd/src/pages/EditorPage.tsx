import { useRef, useState } from 'react'
import { VegaEditor, ExternalSelectionExporter } from 'gui4vega_react'
import type { ExportedData, VegaDataset, VegaSignal, VegaEditorRef } from 'gui4vega_react'
import { Layout, Typography, theme, Flex, Button } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import ExportedContent from '../components/ExportedContent'

// import spec from '../../json/invalid.json'
import spec from '../../../json/anti/02_too_long_sprint.json'

const { Sider, Content } = Layout
const { Title, Paragraph } = Typography

const datasets: VegaDataset[] = [
    {
        name: "initialDataset1",
        values: [
            { category: "A", value: 10 },
            { category: "B", value: 20 }
        ]
    },
    {
        name: "initialDataset2",
        values: [
            { category: "X", value: 90 },
            { category: "Y", value: 80 }
        ]
    }
];

const signals: VegaSignal[] = [
    { name: "initialSignal1", value: 5 },
    { name: "initialSignal2", value: 6 },
];

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

    // Handler for export: print to console and close modal
    const handleExternalExport = (data: ExportedData) => {
        console.log('User-defined further processing:', data)
        setExported(data)
    }

    return (
        <Layout>
            <AppHeader />
            <Content>
                <Flex vertical align="center" gap="small" style={{ padding: '24px 32px 16px', borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
                    <Title level={3}>Visual Specification Editor</Title>
                    <Paragraph type="secondary" style={{ maxWidth: 600, textAlign: 'center' }}>
                        Below this paragraph is the imported VegaEditor component from the <code>gui4vega_react</code> library.
                        Edit the JSON specification on the left and see the rendered visualization on the right.
                    </Paragraph>
                </Flex>

                <Layout>
                    <Sider width={32} style={{ background: token.colorBgLayout, borderRight: `1px solid ${token.colorBorderSecondary}` }} />
                    <Content>
                        <VegaEditor
                            ref={editorRef}
                            height="700px"
                            initialSchema={spec}
                            initialDatasets={datasets}
                            initialSignals={signals}
                            onExport={setExported}
                        />
                        <Flex vertical align="center" gap="small" style={{ padding: '24px 32px 16px', borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
                            <Paragraph type="secondary" style={{ maxWidth: 600, textAlign: 'center' }}>
                                This is no longer content of the VegaEditor, but part of this demo page.
                                Below this paragraph are the results of exporting the JSON specification and selected datasets using the export functionality of the VegaEditor.
                            </Paragraph>
                        </Flex>
                        <Button onClick={handleUserExportClick}>User Export via ExternalSelectionExporter</Button>
                        <ExternalSelectionExporter
                            code={currentCode}
                            isOpen={isExternalExporterOpen}
                            onClose={() => setExternalExporterOpen(false)}
                            onExport={handleExternalExport}
                        />
                        <ExportedContent spec={exported.spec} datasets={exported.datasets} signals={exported.signals} />
                    </Content>
                    <Sider width={32} style={{ background: token.colorBgLayout, borderLeft: `1px solid ${token.colorBorderSecondary}` }} />
                </Layout>
            </Content>
            <AppFooter />
        </Layout>
    )
}