import { PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Popover, PopoverContent } from "../ui/popover"
import { Check } from 'lucide-react'
import { updateMessageRatingReason } from "@/utils/update-message-rating-reason"
import { useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Message } from "@/types"

type Props = {
    messageId: string
    rating: number
    reason: string
}

const RATING_THRESHOLD = 80;

export const EvaluationFeedback = ({
    messageId,
    rating,
    reason
} : Props) => {

    const passed = rating >= RATING_THRESHOLD;

    return (
        <div className="flex items-center justify-start">
            <span
                className="text-gray-600 text-xs italic"
            >
                This response <span className={`${passed ? "text-green-800" : "text-red-800"} font-semibold`}>{passed ? "passed evaluation" : "failed evaluation"}</span> with a rating of
            </span>
            <ChangeRatingPopover 
                messageId={messageId}
                rating={rating}
            />
            <span
                className="text-gray-600 text-xs italic"
            >
                because
            </span>
            <ChangeReasonPopover 
                messageId={messageId}
                reason={reason}
            />
        </div>
    )
}

const ChangeRatingPopover = ({
    messageId,
    rating
} : Omit<Props, "reason">) => {

    const [messagesStorage, setMessagesStorage] = useLocalStorage<Message[]>("messages", []);
    const [userRating, setUserRating] = useState<number | undefined>();

    const handleSave = () => {
        updateMessageRatingReason({
            messageId,
            rating: userRating,
            messagesStorage,
            setMessagesStorage
        });
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="link"
                    className="text-gray-600 text-xs italic font-semibold p-1"
                >
                    {rating}/100
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full"
            >
                <div className="flex gap-2 p-2">
                    <Input
                        type="number"
                        className="w-24"
                        min={0}
                        max={3}
                        value={userRating}
                        onChange={(e) => setUserRating(parseInt(e.target.value))}
                        onKeyDown={(e) => e.code === 'Enter' && handleSave()}
                    />
                    <Button
                        size={"icon"}
                        disabled={!userRating}
                        onClick={() => updateMessageRatingReason({
                            messageId,
                            rating: userRating ?? rating,
                            messagesStorage,
                            setMessagesStorage
                        })}
                    >
                        <Check />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const ChangeReasonPopover = ({
    messageId,
    reason,
} : Omit<Props, "rating">) => {

    const [messagesStorage, setMessagesStorage] = useLocalStorage<Message[]>("messages", []);
    const [userReason, setUserReason] = useState("");

    const handleSave = () => {
        updateMessageRatingReason({
            messageId,
            reason: userReason,
            messagesStorage,
            setMessagesStorage
        });
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="link"
                    className="text-gray-600 text-xs italic font-semibold p-1"
                >
                    {reason}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full"
            >
                <div className="flex gap-2 p-2">
                    <Input
                        className="w-full"
                        max={100}
                        value={userReason}
                        onChange={(e) => setUserReason(e.target.value)}
                        onKeyDown={(e) => e.code === 'Enter' && handleSave()}
                    />
                    <Button
                        size={"icon"}
                        onClick={handleSave}
                        disabled={userReason === ""}
                    >
                        <Check />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}