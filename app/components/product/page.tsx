"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useState } from "react";

const ProductPage = () => {
    const [input, setInput] = useState("");

    const { messages, sendMessage, status, addToolApprovalResponse } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/product",
        }),
        sendAutomaticallyWhen: ({ messages }) => {
            const lastMessage = messages[messages.length - 1];

            return (
                lastMessage?.parts?.some(
                    (part) =>
                        "state" in part &&
                        part.state === "approval-responded" &&
                        "approval" in part &&
                        part.approval?.approved === true
                ) ?? false
            );
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || status !== "ready") return;

        sendMessage({ text: input });
        setInput("");
    };

    const renderMessagePart = (part: any) => {
        switch (part.type) {
            case "text":
                return <p className="leading-relaxed text-gray-800 whitespace-pre-wrap">{part.text}</p>;

            case "tool-getProductDetailsTool":
                return (
                    <div className="my-3 rounded-lg border border-blue-200 bg-blue-50/70 p-4 shadow-sm text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <strong className="text-blue-900 font-semibold uppercase tracking-wider text-xs">
                                Product Lookup Tool
                            </strong>
                        </div>

                        {part.state === "input-available" && (
                            <p className="text-blue-700 italic">
                                Checking order ID: <span className="font-mono font-medium">{part?.input?.orderId}</span>...
                            </p>
                        )}

                        {part.state === "output-available" && (
                            <div>
                                {part?.output?.success ? (
                                    <div className="mt-2 space-y-1.5 rounded-md bg-white p-3 border border-blue-100 text-gray-700">
                                        <p>
                                            <span className="font-medium text-gray-500">Order ID:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.product?.orderId}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Product:</span>{" "}
                                            <span className="font-semibold text-gray-900">{part?.output?.product?.name}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Price:</span>{" "}
                                            <span className="font-bold text-emerald-600">₹{part?.output?.product?.price}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-amber-700 mt-1 font-medium">{part?.output?.message}</p>
                                )}
                            </div>
                        )}

                        {part.state === "output-error" && (
                            <p className="text-red-600 font-medium mt-1">
                                Something went wrong while retrieving product details.
                            </p>
                        )}
                    </div>
                );

            case "tool-searchProductTool":
                return (
                    <div className="my-3 rounded-lg border border-blue-200 bg-blue-50/70 p-4 shadow-sm text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <strong className="text-blue-900 font-semibold uppercase tracking-wider text-xs">
                                Searching Product...
                            </strong>
                        </div>

                        {part.state === "input-available" && (
                            <p className="text-blue-700 italic">
                                Your Product is:
                            </p>
                        )}

                        {part.state === "output-available" && (
                            <div>
                                {part?.output?.success ? (
                                    <div className="mt-2 space-y-1.5 rounded-md bg-white p-3 border border-blue-100 text-gray-700">
                                        <p>
                                            <span className="font-medium text-gray-500">ID:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.product?.id}</span>

                                            {/* <span className="font-medium text-gray-500">Order ID:</span>{" "} */}
                                            {/* <span className="font-mono text-gray-900">{part?.output?.product?.orderId}</span> */}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Product:</span>{" "}
                                            <span className="font-semibold text-gray-900">{part?.output?.product?.name}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Price:</span>{" "}
                                            <span className="font-bold text-emerald-600">₹{part?.output?.product?.price}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-amber-700 mt-1 font-medium">{part?.output?.message}</p>
                                )}
                            </div>
                        )}

                        {part.state === "output-error" && (
                            <p className="text-red-600 font-medium mt-1">
                                Something went wrong while retrieving product details.
                            </p>
                        )}
                    </div>
                );

            case "tool-checkOrderStatusTool":
                return (
                    <div className="my-3 rounded-lg border border-blue-200 bg-blue-50/70 p-4 shadow-sm text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <strong className="text-blue-900 font-semibold uppercase tracking-wider text-xs">
                                Checking your product status...
                            </strong>
                        </div>

                        {part.state === "output-available" && (
                            <div>
                                {part?.output?.success ? (
                                    <div className="mt-2 space-y-1.5 rounded-md bg-white p-3 border border-blue-100 text-gray-700">
                                        <p>
                                            <span className="font-medium text-gray-500">Product Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.productId}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Order Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.orderId}</span>
                                        </p>

                                        <p>
                                            <span className="font-medium text-gray-500">Product:</span>{" "}
                                            <span className="font-semibold text-gray-900">{part?.output?.name}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Price:</span>{" "}
                                            <span className="font-bold text-emerald-600">₹{part?.output?.price}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Status:</span>{" "}
                                            <span className="font-bold text-emerald-600">{part?.output?.status}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-amber-700 mt-1 font-medium">{part?.output?.message}</p>
                                )}
                            </div>
                        )}

                        {part.state === "output-error" && (
                            <p className="text-red-600 font-medium mt-1">
                                Something went wrong while retrieving product details.
                            </p>
                        )}
                    </div>
                );

            case "tool-getProductAvailabilityTool":
                return (
                    <div className="my-3 rounded-lg border border-blue-200 bg-blue-50/70 p-4 shadow-sm text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <strong className="text-blue-900 font-semibold uppercase tracking-wider text-xs">
                                Checking your product Availability...
                            </strong>
                        </div>

                        {part.state === "input-available" && (
                            <p className="text-blue-700 italic">
                                Your Product is:
                            </p>
                        )}

                        {part.state === "output-available" && (
                            <div>
                                {part?.output?.success ? (
                                    <div className="mt-2 space-y-1.5 rounded-md bg-white p-3 border border-blue-100 text-gray-700">
                                        <p>
                                            <span className="font-medium text-gray-500">Product Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.productId}</span>
                                        </p>

                                        <p>
                                            <span className="font-medium text-gray-500">Product:</span>{" "}
                                            <span className="font-semibold text-gray-900">{part?.output?.name}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Price:</span>{" "}
                                            <span className="font-bold text-emerald-600">₹{part?.output?.price}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Availability:</span>{" "}
                                            <span className="font-bold text-emerald-600">{part?.output?.isAvailable ? "In Stock" : "Out of Stock"}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-amber-700 mt-1 font-medium">{part?.output?.message}</p>
                                )}
                            </div>
                        )}

                        {part.state === "output-error" && (
                            <p className="text-red-600 font-medium mt-1">
                                Something went wrong while retrieving product details.
                            </p>
                        )}
                    </div>
                );

            case "tool-cancelOrderTool":
                return (
                    <div className="my-3 rounded-lg border border-blue-200 bg-blue-50/70 p-4 shadow-sm text-sm">

                        {part.state === "approval-requested" && (

                            <div className="rounded-lg border p-4">

                                <h3>
                                    Cancel Order?
                                </h3>

                                <p>
                                    Are you sure you want to cancel
                                    order #{part.input.orderId}?
                                </p>

                                <button
                                    onClick={() =>
                                        addToolApprovalResponse({
                                            id: part.approval.id,
                                            approved: false,
                                        })
                                    }
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        addToolApprovalResponse({
                                            id: part.approval.id,
                                            approved: true,
                                        })
                                    }
                                >
                                    Approve
                                </button>

                            </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <strong className="text-blue-900 font-semibold uppercase tracking-wider text-xs">
                                Checking your product status...
                            </strong>
                        </div>
                        {part.state === "output-available" && (
                            <div>
                                {part?.output?.success ? (
                                    <div className="mt-2 space-y-1.5 rounded-md bg-white p-3 border border-blue-100 text-gray-700">
                                        <p>
                                            <span className="font-medium text-gray-500">Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.id}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Order Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.orderId}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Product Id:</span>{" "}
                                            <span className="font-mono text-gray-900">{part?.output?.productId}</span>
                                        </p>

                                        <p>
                                            <span className="font-medium text-gray-500">Product Name:</span>{" "}
                                            <span className="font-semibold text-gray-900">{part?.output?.name}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Price:</span>{" "}
                                            <span className="font-bold text-emerald-600">₹{part?.output?.price}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Status:</span>{" "}
                                            <span className="font-bold text-emerald-600">{part?.output?.status}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-amber-700 mt-1 font-medium">{part?.output?.message}</p>
                                )}
                            </div>
                        )}

                        {part.state === "output-error" && (
                            <p className="text-red-600 font-medium mt-1">
                                Something went wrong while retrieving product details.
                            </p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    console.log('message', messages)
    return (
        <div className="flex flex-col h-screen w-3xl mx-auto p-4 bg-gray-50">
            {/* Header */}
            <header className="py-4 mb-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">Product Support Assistant</h1>
                <p className="text-xs text-gray-500">Search products by name or order ID</p>
            </header>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => {
                    const isUser = message.role === "user";
                    return (
                        <div
                            key={message.id}
                            className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                        >
                            <span className="text-xs text-gray-400 mb-1 px-1 capitalize">{message.role}</span>
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isUser
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                    }`}
                            >
                                {message.parts.map((part, index) => (
                                    <div key={index}>{renderMessagePart(part)}</div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2 pt-2 border-t border-gray-200 bg-gray-50">
                <input
                    type="text"
                    placeholder="Ask about a product or enter order ID..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm bg-black shadow-sm"
                />
                <button
                    type="submit"
                    disabled={status !== "ready" || !input.trim()}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    {status === "streaming" ? "Replying..." : "Send"}
                </button>
            </form>
        </div>
    );
};

export default ProductPage;