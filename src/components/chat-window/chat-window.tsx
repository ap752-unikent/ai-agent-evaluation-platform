import React, { useEffect } from 'react';
import { Message } from '@/types';
import { MessageEle } from './message-ele';
import { usePrevious } from '@uidotdev/usehooks';
import { NoChatHistoryMessage } from './no-chat-history-message';

type Props = {
    messages: Message[];
    agentTyping: boolean;
    error: boolean;
}

export const ChatWindow = ({
    messages,
    agentTyping,
    error
} : Props) => {

    const [numberOfDots, setNumberOfDots] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const prevMessages = usePrevious(messages);

    useEffect(() => {
        if(agentTyping){
            const interval = setInterval(() => {
                setNumberOfDots((prev) => (prev + 1) % 4);
            }, 200);

            return () => clearInterval(interval);
        }
    }, [agentTyping])

    useEffect(() => {

        const scrollToFn = () => {
            ref.current?.scrollTo({
                top: ref.current?.scrollHeight,
                behavior: 'smooth'
            })
        }

        if(agentTyping){
            scrollToFn();
        }

        if(prevMessages?.length !== messages.length){
            scrollToFn();
        }
    }, [agentTyping, messages])

    return (
        <div
            className="w-full h-full flex flex-col justify-start items-start gap-4 overflow-y-auto p-4"
            ref={ref}
        >
            {
                messages.length === 0 && (
                    <NoChatHistoryMessage   />
                )
            }
            {
                messages.map((message) => (
                    <MessageEle 
                        key={message.id}
                        message={message}
                    />

                ))
            }
            {
                agentTyping && (
                    <MessageEle 
                        message={{
                            id: 'typing',
                            role: 'assistant',
                            content: `Agent is typing${'.'.repeat(numberOfDots)}`
                        }}
                    />
                )
            }
            {
                error && (
                    <MessageEle 
                        message={{
                            id: 'error',
                            role: 'assistant',
                            content: 'An error occurred. Please try again.'
                        }}
                    />
                )
            }
        </div>
    )
}