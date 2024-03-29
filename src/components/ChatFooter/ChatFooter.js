import React, { useState, useRef, useEffect } from "react";

import { ChatFooterSC } from "../styled";

export default function ChatFooter(props) {
    const [message, setMessage] = useState('')
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleMessaging = (e) => {
        const { value } = e.target
        setMessage(value)
        if (value.length > 0) {
            setIsBtnDisabled(false)
        } else {
            setIsBtnDisabled(true)
        }
    }

    const handleSendMessage = (event) => {
        if (event.key === 'Enter' || event.target.ariaLabel === 'sendMessageBtn') {
            // simulate push message to server
            if (message) {
                setTimeout( () => {
                    props.onSendMessge({
                        date: Date.now(),
                        message: message,
                        from: 'Osama Yousry',
                        isIncomming: false,
                    })
                }, 500)
                setMessage('')
                setIsBtnDisabled(true)
            }
        }
    }

    return (
        <ChatFooterSC onClick={() => inputRef.current.focus() }>
            <input
                ref={inputRef}
                aria-label="messageInput"
                placeholder="Type a message..."
                value={message}
                onChange={handleMessaging}
                onKeyPress={handleSendMessage}
            />
            <button
                aria-label="sendMessageBtn"
                className={`${isBtnDisabled && 'disabled'}`}
                disabled={isBtnDisabled}
                onClick={handleSendMessage}
            >
                Send
            </button>
        </ChatFooterSC>
    )
}

