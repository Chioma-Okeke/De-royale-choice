"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import ContactService from "@/app/services/contact-service";
import { toast } from "sonner";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        subject: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const contactService = new ContactService();
            await contactService.sendContactMessage(formData);
            toast.success("Message Delivered", {
                description: "We will get back to you soon.",
            });
            setFormData({ name: "", email: "", message: "", subject: "" });
        } catch (error) {
            console.error(error);
            const errorMessage = (error as Error).message
            toast.error("Message Delivery failed", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Name
                        <span className="text-red-500 text-sm ml-1">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange(e)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Email
                        <span className="text-red-500 text-sm ml-1">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Subject
                    <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange(e)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter subject"
                />
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Message
                    <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange(e)}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your message"
                />
            </div>
            <Button
                isLoading={isLoading}
                className="w-full bg-brand-navy hover:bg-brand-purple"
            >
                {isLoading ? 'Sending' : 'Send Message'}
            </Button>
        </form>
    );
}

export default ContactForm;
