"use client";

import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { ChevronsUpDown, PlusCircle, Store } from 'lucide-react';

import { css } from "../../../styled-system/css";
import { center, flex, hstack } from '../../../styled-system/patterns';
import { Search } from 'lucide-react';
import { Store as StoreType } from '@prisma/client';
import { Check } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useStoreModal } from '@/hooks/use-store-modal';

interface StoreSwitcherProps {
    data: StoreType[]
};

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    const storeModal = useStoreModal();

    const formattedStores = data.map((store) => ({
        label: store.name,
        id: store.id
    }));

    const currentStore = formattedStores.find((store) => store.id === params.storeId);

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={hstack({
                    w: "200px",
                    h: 9,
                    border: "1px solid token(colors.slate.200)",
                    p: 2,
                    rounded: "md",
                    _hover: {
                        cursor: "pointer",
                        bg: "slate.100"
                    }
                })}>
                    <Store size={16} />
                    {currentStore?.label}
                    <ChevronsUpDown size={16} className={css({
                        ml: "auto",
                        color: "slate.500"
                    })} />
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content asChild>
                    <Command className={css({
                        w: "200px",
                        mt: 1,
                        border: "1px solid token(colors.slate.200)",
                        rounded: "md",
                        shadow: "lg",
                        bg: "white"
                    })}>
                        <div className={hstack({
                            px: 3,
                            h: "45px",
                            borderBottom: "1px solid token(colors.slate.200)"

                        })}>
                            <div className={center({
                            })}>
                                <Search size={16} className={css({ color: "gray.600" })} />
                            </div>
                            <Command.Input
                                placeholder='Search store...'
                                className={css({
                                    w: "full",
                                    h: "full",
                                    py: 3,
                                    outline: "none",
                                    fontSize: "sm"
                                })} />
                        </div>
                        <Command.List>
                            <Command.Group heading="Stores" className={css({
                                fontSize: "sm",
                                p: 2,
                                "& > [cmdk-group-heading]": {
                                    px: 1,
                                    pb: 2,
                                    fontSize: "xs",
                                    color: "slate.600"
                                },
                                borderBottom: "1px solid token(colors.slate.200)"
                            })}>
                                {formattedStores.map((store) => (
                                    <Command.Item
                                        key={store.id}
                                        onSelect={() => router.push(`/${store.id}`)}
                                        className={css({
                                            p: 1,
                                            py: 2,
                                            rounded: "md",
                                            "&[data-selected=true]": {
                                                bg: "slate.100"
                                            },
                                            _hover: {
                                                cursor: "pointer"
                                            }
                                        })}>
                                        <div className={hstack()}>
                                            <Store size={16} />
                                            {store.label}
                                            <Check size={16} className={css({
                                                opacity: store.id === currentStore?.id ? "100%" : "0%",
                                                ml: "auto"
                                            })} />
                                        </div>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                            <Command.Group className={css({
                                fontSize: "sm",
                                p: 1,
                                borderBottom: "1px solid token(colors.slate.200)"
                            })}>
                                <Command.Item
                                    onSelect={storeModal.onOpen}
                                    className={hstack({
                                            p: 2,
                                            rounded: "md",
                                            "&[data-selected=true]": {
                                                bg: "slate.100"
                                            },
                                            _hover: {
                                                cursor: "pointer"
                                            }
                                        })}>
                                            <PlusCircle size={20} />
                                            Create store
                                </Command.Item>

                            </Command.Group>
                        </Command.List>
                    </Command>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default StoreSwitcher;
