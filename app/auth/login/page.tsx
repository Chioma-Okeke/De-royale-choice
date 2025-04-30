"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@bprogress/next";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make API call to the login endpoint
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            const { user } = data;

            if (user.role === "admin") {
                router.push("/dashboard/admin");
            } else if (user.role === "staff") {
                router.push("/dashboard/staff");
            } else {
                router.push("/dashboard/staff");
            }
            toast.success("Authentication Successful", {
                description: "You have successfully logged in."
            })
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Authentication Error", {
                description: "Invalid username or password."
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-md border-brand-navy/20 shadow-lg rounded-md">
                <CardHeader className="space-y-1">
                    {/* <div className="flex justify-center mb-4">
                        <Logo size="lg" />
                    </div> */}
                    <CardTitle className="text-2xl text-center text-brand-navy">
                        Staff Portal
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">
                                    Username{" "}
                                    <span className="text-red-500 text-sm">
                                        *
                                    </span>
                                </Label>
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Password{" "}
                                    <span className="text-red-500 text-sm">
                                        *
                                    </span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-brand-navy hover:bg-brand-purple text-white"
                                isLoading={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        <p>Demo credentials:</p>
                        <p>Username: admin or staff</p>
                        <p>Password: password</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
