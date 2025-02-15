import { Message } from "@/types";

type Props = {
    messageId: string;
    rating?: number;
    reason?: string;
    messagesStorage: Message[];
    setMessagesStorage: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const updateMessageRatingReason = ({
    messageId,
    rating,
    reason,
    messagesStorage,
    setMessagesStorage
}: Props) => {

    const newMessages = messagesStorage.map((message) => {

        if (message.id === messageId) {
            const newMessage = message;

            if (rating)
                message.rating = rating;

            if (reason)
                message.reason = reason;

            return newMessage;
        }

        return message;
    });

    setMessagesStorage(newMessages);
}