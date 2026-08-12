"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useState } from "react";

const ProductPage = () => {
    const [input, setInput] = useState("");

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/product",
        }),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.trim()) return;

        sendMessage({
            text: input,
        });

        setInput("");
    };

    return (
        <>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <strong>{message.role}:</strong>

                        {message.parts.map((part, index) => (
                            <div key={index}>
                                {part.type === "text" ? (
                                    <span>{part.text}</span>
                                ) : part.type === "tool-getProductDetailsTool" ? (
                                    <div>
                                        <strong>Product Tool</strong>

                                        {part.state === "input-available" && (
                                            <p>
                                                Checking order: {part?.input?.orderId}
                                            </p>
                                        )}

                                        {part.state === "output-available" && (
                                            <div>
                                                {part?.output?.success ? (
                                                    <div>
                                                        <p>
                                                            Order ID: {part?.output?.product?.orderId}
                                                        </p>

                                                        <p>
                                                            Product: {part?.output?.product?.name}
                                                        </p>

                                                        <p>
                                                            Price: ₹{part?.output?.product?.price}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p>{part?.output?.message}</p>
                                                )}
                                            </div>
                                        )}

                                        {part.state === "output-error" && (
                                            <p>
                                                Something went wrong while getting the product.
                                            </p>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your order id"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button type="submit" disabled={status !== "ready"}>
                    Send Query
                </button>
            </form>
        </>
    );
};

export default ProductPage;