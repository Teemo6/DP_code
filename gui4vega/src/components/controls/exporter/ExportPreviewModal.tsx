import React from 'react';
import { Modal, Button } from 'antd';
import ExportedContent from './ExportedContent.tsx';
import type { ExportedData } from './helper/exportSelectedData.ts';

/**
 * Props for {@link ExportPreviewModal}.
 */
export interface ExportPreviewModalProps {
    /**
     * State controlling the visibility of the modal.
     */
    open: boolean;
    /**
     * The data to be previewed in the modal.
     * If `null`, no content will be shown.
     */
    data: ExportedData | null;
    /**
     * Callback function that is called when the modal is closed, either by clicking the cancel button or the close icon.
     */
    onClose: () => void;
    /**
     * Callback function that is called when the user clicks the "Back" button.
     */
    onBack: () => void;
    /**
     * Callback function that is called when the user clicks the "Export" button to confirm the export action.
     */
    onConfirm: () => void;
}

/**
 * Component responsible for displaying a preview of the exported data in a modal dialog.
 * @param props - {@link ExportPreviewModalProps}
 */
export const ExportPreviewModal: React.FC<ExportPreviewModalProps> = (props: ExportPreviewModalProps) => {
    return (
        <Modal
            title="Exported Content"
            open={props.open}
            onCancel={props.onClose}
            width={900}
            footer={
                <>
                    <Button key="back" onClick={props.onBack}>Back</Button>
                    <Button key="submit" type="primary" onClick={props.onConfirm}>Export</Button>
                </>
            }
        >
            {props.data && <ExportedContent data={props.data} />}
        </Modal>
    );
};

export default ExportPreviewModal;