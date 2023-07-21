"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
    const open = useStoreModal((store) => store.open);
    const onOpen = useStoreModal((store) => store.onOpen);

    useEffect(() => {
        if (!open) {
            onOpen();
        }
    }, [open, onOpen]);

    return null;
};

export default SetupPage;
