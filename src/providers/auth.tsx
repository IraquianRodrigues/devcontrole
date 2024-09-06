"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { Children } from "react";

export const AuthProvider = ({children}:SessionProviderProps) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}