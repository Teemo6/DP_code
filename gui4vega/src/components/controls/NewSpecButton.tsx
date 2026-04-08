import React from 'react';
import { Button, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import type { VegaEditorState } from "../useVegaEditor.ts";

import newSpec from '../../assets/newSpec.json';

/**
 * Props for {@link NewSpecButton}.
 */
interface NewSpecButtonProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for rendering a button that overwrites the editor with a new Vega specification.
 * @param props - {@link NewSpecButtonProps}
 */
const NewSpecButton: React.FC<NewSpecButtonProps> = (props: NewSpecButtonProps) => {
    // State to hold modal visibility
    const [modal, contextHolder] = Modal.useModal();

    const handleNewSpec = () => {
        modal.confirm({
            title: 'Are you sure?',
            content: 'This will replace your current specification.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                props.editorState.setCode(JSON.stringify(newSpec, null, 2));
            }
        });
    };

    return (
        <>
            {contextHolder}
            <Button icon={<FileAddOutlined />} onClick={handleNewSpec}>
                New Specification
            </Button>
        </>
    );
};

export default NewSpecButton;