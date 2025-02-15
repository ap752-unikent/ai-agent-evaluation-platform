import { useEffect, useState } from 'react'
import { ChatWindow } from './components/chat-window/chat-window'
import { ChatInput } from './components/chat-input/chat-input'
import useOpenAIResponse from './hooks/use-open-ai-response';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';
import { evaluationScores } from './mocks';

function App() {

  const {
    response,
    error,
    loading,
    fetchResponse,
  } = useOpenAIResponse();

  const [messages, setMessages] = useLocalStorage<Message[]>('messages', []);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {

    if(response !== ""){

      const randomEvaluation = evaluationScores[Math.floor(Math.random() * evaluationScores.length)];

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: response,
          id: uuidv4(),
          rating: randomEvaluation.score,
          reason: randomEvaluation.reason
        }
      ]);
    }
  }, [response]);

  const handleChatSubmit = () => {
    const newMessageState : Message[] = [
      ...messages,
      {
        role: "user",
        content: chatInput,
        id: uuidv4()
      }
    ]

    setMessages(newMessageState);
    fetchResponse(newMessageState);
    setChatInput('');
  }

  return (
    <div
      className='
      h-[100vh]
      flex 
      flex-col 
      justify-center 
      items-center 
      bg-white
      border-zinc-950
      rounded-xl
      text-gray-800 
      p-12 
      w-full'
    >
      <ChatWindow
        messages={messages}
        agentTyping={loading}
        error={error}
      />
      <ChatInput
        value={chatInput}
        onChange={setChatInput}
        onSubmit={handleChatSubmit}
      />
    </div>
  )
}

export default App
