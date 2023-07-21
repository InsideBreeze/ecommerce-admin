"use client";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

import { CategoryColumn } from "./columns";
import AlertModal from '@/components/modals/alert-modal';

import { css } from '../../../../../../../styled-system/css';
import { center, hstack } from '../../../../../../../styled-system/patterns';

interface CellActionProps {
    data: CategoryColumn
};

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const params = useParams();
    const onCopy = async () => {
        try {
            if (window.navigator) {
                await window.navigator.clipboard.writeText(data.id);
            }
            toast.success("Category id copied to the clipboard.")
        } catch (err) {
            // Do something
            toast.error("Copy category id failed.");
        }
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}/categories/${data.id}`);
            toast.success("The category is deleted.")
            router.refresh();
        } catch (err) {
            toast.error("Delete category failed");
        } finally {
            setLoading(false);
            setOpenAlert(false);
        }
    }

    return (
        <>
            <AlertModal
                title="Are you sure?"
                description="This action cannot be undone"
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={center({
                        p: 1,
                        _hover: {
                            cursor: "pointer"
                        },
                        _focusVisible: {
                            outline: "none"
                        }
                    })}>
                        <MoreHorizontal className={css({
                            h: 4,
                            w: 4,
                        })} />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align='start'
                        className={css({
                            bg: "white",
                            p: 1,
                            shadow: "md",
                            border: "1px solid token(colors.slate.200)",
                            rounded: "md",
                            minW: "8em",
                            w: "full"
                        })}>

                        <DropdownMenu.Label className={css({
                            fontSize: "sm",
                            fontWeight: "semibold",
                            px: 2,
                            py: "6px"
                        })}>
                            Actions
                        </DropdownMenu.Label>

                        <DropdownMenu.Item asChild>
                            <div
                                onClick={onCopy}
                                className={hstack({
                                    px: 2,
                                    py: "6px",
                                    _hover: {
                                        bg: "slate.200",
                                        cursor: "pointer",
                                        outline: "none"
                                    },
                                    rounded: "md",
                                    fontSize: "sm",
                                    color: "slate.800",
                                    transition: "color"
                                })}>
                                <Copy size={16} />
                                Copy Id
                            </div>

                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <div
                                onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}
                                className={hstack({
                                    px: 2,
                                    py: "6px",
                                    _hover: {
                                        bg: "slate.200",
                                        cursor: "pointer",
                                        outline: "none"
                                    },
                                    rounded: "md",
                                    fontSize: "sm",
                                    color: "slate.800",
                                    transition: "color"
                                })}>
                                <Edit size={16} />
                                Update
                            </div>

                        </DropdownMenu.Item>

                        <DropdownMenu.Item asChild>
                            <div
                                onClick={() => setOpenAlert(true)}
                                className={hstack({
                                    px: 2,
                                    py: "6px",
                                    _hover: {
                                        bg: "slate.200",
                                        cursor: "pointer",
                                        outline: "none"
                                    },
                                    rounded: "md",
                                    fontSize: "sm",
                                    color: "slate.800",
                                    transition: "color"
                                })}>
                                <Trash size={16} />
                                Delete
                            </div>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};

export default CellAction;
