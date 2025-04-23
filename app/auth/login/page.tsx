"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/Logo/logo";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

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

            // Login successful
            const { user } = data;

            // Redirect based on user role
            if (user.role === "admin") {
                router.push("/dashboard/admin");
            } else if (user.role === "staff") {
                router.push("/dashboard/staff");
            } else {
                // For limited role or any other role
                router.push("/dashboard/staff");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred"
            );
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
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
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
                                <Label htmlFor="password">Password</Label>
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
                                disabled={isLoading}
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
                <CardFooter className="flex justify-center">
                    <Link
                        href="/"
                        className="text-sm text-brand-navy hover:text-brand-purple"
                    >
                        Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
