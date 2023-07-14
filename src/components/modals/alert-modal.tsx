"use client";

import { hstack } from "../../../styled-system/patterns";
import { button } from "../../../styled-system/recipes";
import Modal from "../ui/modal";

interface AlertModalProps {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean
};

const AlertModal: React.FC<AlertModalProps> = ({
    title,
    description,
    open,
    onClose,
    onConfirm,
    loading
}) => {
    return (
        <Modal
            title={title}
            description={description}
            open={open}
            onClose={onClose}
        >
            <div className={hstack({
                justify: "flex-end",
                mt: 8
            })}>
                <button
                    disabled={loading}
                    onClick={onClose}
                    className={button({
                    visual: "outline"
                })}>
                    Cancel
                </button>
                <button
                    disabled={loading}
                    onClick={onConfirm}
                    className={button({
                    visual: "destructive"
                })}>
                    Continue
                </button>
            </div>
        </Modal>
    );
};

export default AlertModal;
