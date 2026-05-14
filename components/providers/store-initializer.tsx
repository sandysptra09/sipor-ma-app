'use client';

import { useRef } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function StoreInitializer({ user }: { user: any }) {

    const initialized = useRef(false);

    if (!initialized.current) {
        useUserStore.setState({ user });
        initialized.current = true;
    }


    return null;
}