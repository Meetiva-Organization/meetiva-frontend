"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const { user } = useAuth();
    const initial = user?.firstName?.charAt(0).toUpperCase() || "?";
    return (
        <header className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold">Meetiva</h2>
            <button
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
                {initial}
            </button>
        </header>
    );
}
