import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Send } from 'lucide-react'

type Props = {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

export const ChatInput = ({
    value,
    onChange,
    onSubmit
} : Props) => {

    return (
        <div
            className="relative w-full h-12 flex justify-start items-center border border-gray-500 rounded-full focus:ring-zinc-950"
        >
            <Input 
                placeholder="Type a message..."
                className="
                w-90% 
                h-full 
                border-none 
                focus-visible:ring-0
                focus-visible:outline-none
                focus-visible:border-none
                "
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.code === 'Enter' && onSubmit()}
            />
            <Button
                className="rounded-full
                w-8
                h-8
                mr-2
                "
                disabled={!value}
                onClick={onSubmit}
            >
                <Send 
                    size={24}
                />
            </Button>
        </div>
    )

}