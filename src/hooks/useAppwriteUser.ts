// hooks/useAppwriteUser.ts
"use client";

import { useEffect, useState } from "react";
import { account } from "@/utils/appwrite";

// Define the types of the user object
interface AppwriteUser {
    name: string;
    email: string;
    $id: string;
    emailVerification: boolean;
}

export function useAppwriteUser() {
    const [user, setUser] = useState<AppwriteUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user data after login
        account.get()
            .then((u) => {
                setUser(u);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user, loading };
}
