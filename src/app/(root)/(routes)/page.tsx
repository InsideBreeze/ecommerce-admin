"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

import { css } from "../../../../styled-system/css";

interface SetupPageProps {

};

const SetupPage: React.FC<SetupPageProps> = () => {
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
