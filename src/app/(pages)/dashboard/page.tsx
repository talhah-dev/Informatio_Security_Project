"use client";

import { useState } from "react";
import { LockIcon, DatabaseIcon, ShieldCheckIcon, EyeIcon } from "lucide-react";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
    const [password, setPassword] = useState("");
    const secretKey = "123";

    const encryptedPassword = password
        ? CryptoJS.AES.encrypt(password, secretKey).toString()
        : "";

    const decryptedPassword = encryptedPassword
        ? CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(
            CryptoJS.enc.Utf8
        )
        : "";

    return (
        <main className="min-h-screen bg-background p-6 md:py-20">
            <div className="mx-auto max-w-4xl space-y-10">
                <div className="flex items-center justify-between">

                    <div className=" space-y-2">
                        <h1 className="text-3xl font-bold tracking-wide">
                            Security Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Visual representation of password security and encryption
                        </p>
                    </div>

                    <Link href={"/dashboard/userlist"}>
                        <Button>
                            All Users
                        </Button>
                    </Link>

                </div>


                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <EyeIcon />
                            <h2 className="font-semibold text-lg">
                                User Entered Password
                            </h2>
                        </div>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        />

                        <p className="text-sm text-muted-foreground">
                            This password is visible only to the user and never
                            stored directly.
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-green-500">
                            <DatabaseIcon />
                            <h2 className="font-semibold text-lg">
                                Stored in Database
                            </h2>
                        </div>

                        <div className="rounded-lg bg-muted p-3 break-all text-sm">
                            {encryptedPassword || "Encrypted value will appear here"}
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Passwords are encrypted before being saved in the database.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                        <LockIcon />
                        <h2 className="font-semibold text-lg">
                            Decryption (Authentication Check)
                        </h2>
                    </div>

                    <div className="rounded-lg bg-muted p-3 text-sm">
                        {decryptedPassword || "Decrypted password will appear here"}
                    </div>

                    <p className="text-sm text-muted-foreground">
                        During login, encrypted data is decrypted securely only for
                        verification.
                    </p>
                </div>

                <div className="rounded-2xl border bg-secondary/40 p-6 text-center space-y-3">
                    <ShieldCheckIcon className="mx-auto text-primary" size={32} />
                    <h3 className="font-semibold text-lg">
                        Secure Authentication System
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Your password is never stored in plain text. We use strong
                        encryption with secret keys to ensure maximum security and
                        data protection.
                    </p>
                </div>
            </div>
        </main>
    );
}
