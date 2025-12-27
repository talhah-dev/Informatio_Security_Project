"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { AtSignIcon, LockIcon, ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { FloatingPaths } from "./FloatingPaths";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/myApi/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";
import Link from "next/link";

export function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: login,

        onSuccess: (res) => {
            toast.success(res?.data?.message ?? "Logged in");
            router.push("/dashboard");
        },

        onError: (error: any) => {
            const msg =
                error?.response?.data?.message || error?.message || "Login failed";
            toast.error(msg);
        },
    });

    const handleLogin = () => {
        mutate({ email, password });
    };

    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                <div className="z-10 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl">
                            &ldquo;This Platform has helped me to save time and serve my
                            clients faster than ever before.&rdquo;
                        </p>
                        <footer className="font-mono font-semibold text-sm">
                            ~ Muhammad Talha
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            <div className="relative flex min-h-screen flex-col justify-center p-4">
                <Button asChild className="absolute top-7 left-5" variant="ghost">
                    <a href="#">
                        <ChevronLeftIcon />
                        Home
                    </a>
                </Button>

                <div className="mx-auto space-y-4 sm:w-sm">
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-bold text-2xl tracking-wide">
                            Login
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Enter your credentials to continue
                        </p>
                    </div>

                    <form className="space-y-3 " onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    >
                        <InputGroup>
                            <InputGroupInput
                                placeholder="your.email@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <InputGroupAddon>
                                <AtSignIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <InputGroup>
                            <InputGroupInput
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <InputGroupAddon>
                                <LockIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button disabled={isPending} className="w-full" type="button" onClick={handleLogin}>
                            {
                                isPending ? <Spinner /> : "Login"
                            }
                        </Button>

                        <p className="mt-2 text-center text-muted-foreground text-sm">
                            Don't have an account?{" "}
                            <Link href={"/auth/signup"} className="underline">Sign up</Link>
                        </p>

                    </form>
                </div>
            </div>
        </main>
    );
}
