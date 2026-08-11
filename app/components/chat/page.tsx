"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, FormEvent } from "react"

const ChatUI = () => {
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/stream"
        })
    })
    const [input, setInput] = useState('')
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessage({
            text: input
        })
        setInput("")
    }
    console.log('mes', messages)
    return <>
        <div>
            {
                messages?.map(message => (
                    <div key={message.id}>
                        {message.role}:
                        {message.parts.map((part, index) =>
                            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                        )}
                    </div>
                ))
            }
        </div>
        <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type your query"
                type="text" />
            <button type="submit">Send</button>
        </form>
    </>
}
export default ChatUI