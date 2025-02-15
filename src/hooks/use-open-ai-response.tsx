import { Message } from "@/types";
import { AzureOpenAI } from "openai";
import { useState, useCallback } from "react";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

type Props = {
    messages: Message[];
}

const useOpenAIResponse = () => {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const client = new AzureOpenAI({
        endpoint: "https://maihem-openai-uswest.openai.azure.com",
        apiKey: apiKey,
        //This is only for demo purposes, BE would be used for real cases.
        dangerouslyAllowBrowser: true,
        apiVersion: "2024-08-01-preview",
        deployment: "maihem-mini"
    });

    const fetchResponse = useCallback(async (messages: Props["messages"]) => {
        setResponse("");
        setLoading(true);
        setError(false);

        try {
            const response = await client.chat.completions.create({
                model: 'gpt-4o',
                messages: messages,
            });

            setResponse(response.choices[0].message.content ?? "");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    return { response, loading, error, fetchResponse};
};

export default useOpenAIResponse;
