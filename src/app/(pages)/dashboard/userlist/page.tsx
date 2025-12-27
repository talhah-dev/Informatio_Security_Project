"use client";

import { ShieldCheckIcon, DatabaseIcon, UserIcon, MailIcon, LockIcon } from "lucide-react";
import { allUsers } from "@/lib/myApi/user";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const users = [
    {
        id: 1,
        name: "Muhammad Talha",
        email: "talha@example.com",
        password: "Talha@123",
    },
    {
        id: 2,
        name: "Ali Khan",
        email: "ali@example.com",
        password: "Ali@456",
    },
    {
        id: 3,
        name: "Sara Ahmed",
        email: "sara@example.com",
        password: "Sara@789",
    },
];

export type userPayload = {
    name: string;
    email: string;
    password: string;
};

export default function UsersDatabase() {


    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: allUsers,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500">
                Failed to load users
            </p>
        );
    }

    const users = data?.data?.user ?? [];


    return (
        <main className="min-h-screen bg-background p-6">
            <div className="mx-auto max-w-5xl space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-wide">
                        Users Database
                    </h1>
                    <p className="text-muted-foreground">
                        All registered users with securely stored credentials
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="grid grid-cols-4 gap-4 border-b bg-secondary/40 px-6 py-4 text-sm font-semibold">
                        <div className="flex items-center gap-2">
                            <UserIcon size={16} />
                            Name
                        </div>
                        <div className="flex items-center gap-2">
                            <MailIcon size={16} />
                            Email
                        </div>
                        <div className="flex items-center gap-2">
                            <LockIcon size={16} />
                            Encrypted Password
                        </div>
                        <div className="flex items-center gap-2">
                            <DatabaseIcon size={16} />
                            Storage Status
                        </div>
                    </div>

                    {users.map((user: userPayload, idx: number) => (
                        <div
                            key={idx}
                            className="grid grid-cols-4 gap-4 px-6 py-4 text-sm border-b last:border-none"
                        >
                            <div className="font-medium">{user.name}</div>
                            <div className="text-muted-foreground">
                                {user.email}
                            </div>
                            <div className="truncate text-xs bg-muted rounded-md p-2">
                                {user.password}
                            </div>
                            <div className="text-green-600 font-semibold">
                                Secured
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border bg-secondary/30 p-6 text-center space-y-3">
                    <ShieldCheckIcon
                        size={36}
                        className="mx-auto text-primary"
                    />
                    <h3 className="font-semibold text-lg">
                        Database Security Overview
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        User passwords are never stored in plain text. Before saving
                        to the database, passwords are encrypted using a secure secret
                        key. This ensures data protection even if the database is
                        compromised.
                    </p>
                </div>
            </div>
        </main>
    );
}
