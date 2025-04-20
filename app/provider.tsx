'use client'

import { Toaster as Sonner } from "@/components/ui/sonner";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProgressProvider
                height="5px"
                color="#5B4CCC"
                options={{ showSpinner: false }}
                shallowRouting
            >
                <ReactLenis root>{children}</ReactLenis>
            </ProgressProvider>
            <Sonner richColors expand={true} position="top-right" />
        </>
    );
}
