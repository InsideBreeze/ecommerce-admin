"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { X } from "lucide-react";

import { css } from '../../../styled-system/css';

interface ModalProps {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode
};

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    open,
    onClose,
    children
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className={css({
                    pos: "fixed",
                    inset: 0,
                })}/>
                <Dialog.Content className={css({
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    shadow: "xl",
                    p: 6,
                    maxW: "lg",
                    w: "full",
                    rounded: "lg",
                    border: "1px solid token(colors.slate.100)"
                })}>
                    <Dialog.Title className={css({
                        fontSize: "lg",
                        fontWeight: "semibold"
                    })}>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className={css({
                        color: "slate.600"
                    })}>
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className={css({
                                pos: "absolute",
                                p: "2px",
                                top: 4,
                                right: 4,
                                opacity: {
                                    base: "75%",
                                    _hover: "100%"
                                },
                                rounded: "md",
                                _hover: {
                                    cursor: "pointer"
                                },
                                _focus: {
                                    ring: "1px solid blue"
                                }
                            })}
                        >
                            <X size={16} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    );
};

export default Modal;
