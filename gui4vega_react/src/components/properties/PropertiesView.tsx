import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { parseMarks, updateMarkProperty } from './helper/markEdit.ts';
import MarkCard from './MarkCard';

interface PropertiesViewProps {
    code: string;
    onCodeChange: (code: string) => void;
}

const PropertiesView: React.FC<PropertiesViewProps> = ({ code, onCodeChange }) => {
    const marks = useMemo(() => parseMarks(code), [code]);

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
                            onCodeChange(updateMarkProperty(code, markIndex, encodeSet, property, field, newValue))
                        }
                    />
                ))
            )}
        </div>
    );
};

export default PropertiesView;