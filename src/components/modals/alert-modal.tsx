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
};

const AlertModal: React.FC<AlertModalProps> = ({
    title,
    description,
    open,
    onClose,
    onConfirm
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
                    onClick={onClose}
                    className={button({
                    visual: "outline"
                })}>
                    Cancel
                </button>
                <button
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
