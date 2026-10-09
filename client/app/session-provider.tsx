"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Session = {
    username: string | null;
    setUsername: (username: string | null) => void;
};

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <SessionContext.Provider value={{ username, setUsername }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const session = useContext(SessionContext);

    if (!session) {
        throw new Error("useSession must be used within SessionProvider");
    }

    return session;
}
