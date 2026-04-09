import React, { useMemo } from 'react';
import { Divider, Flex, Typography } from 'antd';
import { parseMarks, updateMarkProperty } from './helper/markEdit.ts';
import { parseAxes, updateAxisProperty } from './helper/axisEdit.ts';
import MarkCard from './MarkCard';
import AxisCard from './AxisCard';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link PropertiesView}.
 */
interface PropertiesViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for displaying and managing various properties in the Vega specification.
 * @param props - {@link PropertiesViewProps}
 */
const PropertiesView: React.FC<PropertiesViewProps> = (props: PropertiesViewProps) => {
    // Parse marks and axes from spec
    const marks = useMemo(() => parseMarks(props.editorState.code), [props.editorState.code]);
    const axes = useMemo(() => parseAxes(props.editorState.code), [props.editorState.code]);

    return (
        <Flex vertical style={{ width: '100%', padding: 8, overflow: 'auto'}}>

            {/* Axes */}
            <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                <Typography.Title level={5} style={{ margin: 0 }}>Axes</Typography.Title>
            </Flex>
            {axes.length === 0 ? (
                <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                    <Typography.Text type="secondary" style={{ margin: 0 }}>No axes found in spec.</Typography.Text>
                </Flex>
                ) : (
                <>
                    {axes.map((axis, i) => (
                        <AxisCard
                            key={`axis-${i}`}
                            axis={axis}
                            axisIndex={i}
                            onPropertyChange={(axisIndex, property, newValue) => {
                                props.editorState.setCode(updateAxisProperty(props.editorState.code, axisIndex, property, newValue));
                            }}
                        />
                    ))}
                </>
            )}

            <Divider />

            {/* Marks */}
            <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                <Typography.Title level={5} style={{ margin: 0 }}>Marks</Typography.Title>
            </Flex>
            {marks.length === 0 ? (
                <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                    <Typography.Text type="secondary" style={{ margin: 0 }}>No marks found in spec..</Typography.Text>
                </Flex>
            ) : (
                marks.map((mark, i) => (
                    <MarkCard
                        key={`axis-${i}`}
                        mark={mark}
                        markIndex={i}
                        onPropertyChange={(markIndex, encodeSet, property, field, newValue) =>
                            props.editorState.setCode(updateMarkProperty(props.editorState.code, markIndex, encodeSet, property, field, newValue))
                        }
                    />
                ))
            )}
        </Flex>
    );
};

export default PropertiesView;