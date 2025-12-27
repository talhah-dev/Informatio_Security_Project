"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    AtSignIcon,
    LockIcon,
    UserIcon,
    ChevronLeftIcon,
} from "lucide-react";
import { useState } from "react";
import { FloatingPaths } from "./FloatingPaths";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/myApi/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            console.log(data);
            router.push("/auth/login")
            toast.success("Account created successfully")
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.response.data.message)
        },
    })

    const handleSignup = () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        mutate({ name, email, password });

    };

    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                <div className="z-10 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl">
                            &ldquo;Secure onboarding that protects your data and privacy
                            from day one.&rdquo;
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
                            Create Account
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Fill in your details to get started
                        </p>
                    </div>

                    <form className="space-y-3">
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Full Name"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <InputGroupAddon>
                                <UserIcon />
                            </InputGroupAddon>
                        </InputGroup>

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

                        <InputGroup>
                            <InputGroupInput
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                            <InputGroupAddon>
                                <LockIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button disabled={isPending} className="w-full" type="button" onClick={handleSignup}>
                            {
                                isPending ? <Spinner /> : "Create Account"
                            }
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-muted-foreground text-sm">
                        This is a secure authentication process protected with modern
                        encryption standards.
                    </p>
                </div>
            </div>
        </main>
    );
}
