import React from 'react';
import { Checkbox, Typography, Divider, Flex, Layout } from 'antd';

const { Title } = Typography;

/**
 * Props for {@link SelectionConfigurator}.
 */
export interface SelectionConfiguratorProps {
    /**
     * List of dataset names from the Vega specification, which are available for selection by the user for export.
     */
    datasetNames: string[];
    /**
     * List of signal names from the Vega specification, which are available for selection by the user for export.
     */
    signalNames: string[];
    /**
     * List of currently selected dataset names that the user has chosen to export.
     */
    datasetSelection: string[];
    /**
     * List of currently selected signal names that the user has chosen to export.
     */
    signalSelection: string[];
    /**
     * Callback function that is called when the user changes their selection of datasets for export.
     * @param selection - The updated list of selected dataset names.
     */
    setDatasetSelection: (selection: string[]) => void;
    /**
     * Callback function that is called when the user changes their selection of signals for export.
     * @param selection - The updated list of selected signal names.
     */
    setSignalSelection: (selection: string[]) => void;
}

/**
 * Component responsible for rendering the selection interface for datasets and signals.
 * This allows users to choose which ones to include in the export.
 * @param props - {@link SelectionConfiguratorProps}
 */
const SelectionConfigurator: React.FC<SelectionConfiguratorProps> = (props: SelectionConfiguratorProps) => {
    return (
        <Flex gap="large" style={{ minHeight: 200 }}>
            {/* Show datasets section only if there are datasets available */}
            {props.datasetNames.length > 0 && (
                <Flex vertical flex={1} style={{ minWidth: 0 }}>
                    <Title level={5}>Datasets</Title>
                    <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                        <Checkbox.Group
                            options={props.datasetNames}
                            value={props.datasetSelection}
                            onChange={props.setDatasetSelection}
                            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                        />
                    </Layout>
                </Flex>
            )}

            {/* Show divider only if both datasets and signals are present */}
            {props.datasetNames.length > 0 && props.signalNames.length > 0 && <Divider vertical style={{ height: 'auto' }} />}

            {/* Show signals section only if there are signals available */}
            {props.signalNames.length > 0 && (
                <Flex vertical flex={1} style={{ minWidth: 0 }}>
                    <Title level={5}>Signals</Title>
                    <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                        <Checkbox.Group
                            options={props.signalNames}
                            value={props.signalSelection}
                            onChange={props.setSignalSelection}
                            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                        />
                    </Layout>
                </Flex>
            )}
        </Flex>
    );
};

export default SelectionConfigurator;