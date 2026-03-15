import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { parseMarks, updateMarkProperty } from './helper/markEdit.ts';
import MarkCard from './MarkCard';
import type {VegaEditorState} from "../useVegaEditor.ts";

interface PropertiesViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

const PropertiesView: React.FC<PropertiesViewProps> = (props: PropertiesViewProps) => {
    const marks = useMemo(() => parseMarks(props.editorState.code), [props.editorState.code]);

    return (
        <div style={{ padding: 16, overflow: 'auto', height: '100%' }}>
            {marks.length === 0 ? (
                <Typography.Text type="secondary">No marks found in spec.</Typography.Text>
            ) : (
                marks.map((mark, i) => (
                    <MarkCard
                        key={`${mark.type}-${i}`}
                        mark={mark}
                        markIndex={i}
                        onPropertyChange={(markIndex, encodeSet, property, field, newValue) =>
                            props.editorState.setCode(updateMarkProperty(props.editorState.code, markIndex, encodeSet, property, field, newValue))
                        }
                    />
                ))
            )}
        </div>
    );
};

export default PropertiesView;