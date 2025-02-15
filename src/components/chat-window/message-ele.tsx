import { Message } from "@/types";
import Markdown from "react-markdown";
import { EvaluationFeedback } from "./evaluation-feedback";

type Props = {
    message: Message;
}

export const MessageEle = ({
    message
}: Props) => {

    return (
        <div
            className="flex flex-col w-full"
            p-2
        >
            <div
                className={`
            flex
            w-full
            ${message.role === 'user' ? 'self-end' : 'self-start'}
            `}
            >
                <div
                    className={`
                flex
                gap-y-2
                flex-col
                rounded-lg
                ${message.id === "error" ? 'text-red-600' : 'zinc-950'}
                ${message.role === 'user' ? 'bg-zinc-100' : 'white'}
                ${message.role === 'user' ? 'p-2' : 'p-0'}
            `}
                >
                    <Markdown>
                        {message.content}
                    </Markdown>
                </div>
            </div>
            {
                message.role === 'assistant' && message.rating !== undefined && message.reason && (
                    <EvaluationFeedback
                        messageId={message.id}
                        rating={message.rating}
                        reason={message.reason}
                    />
                )
            }
        </div>

    )
}