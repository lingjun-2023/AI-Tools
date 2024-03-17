"use client"
import React, { useState, useEffect } from 'react'
import MessageArea from './components/MessageArea'
import ChatSideBar from './components/ChatSideBar'
import SelectItems from '@/components/SelectItems'
import SendForm from '../../components/SendForm'
import { CirclePause } from 'lucide-react'
import { useChat } from 'ai/react';
import { Message } from 'ai'
import toast from 'react-hot-toast'

interface IChatMessage {
  name: string;
  chatMessage: Message[],
  id: string
}

const AiChatPage = () => {
  const [model, setModel] = useState('gpt-3.5-turbo')
  const [apiToken, setApiToken] = useState('')
  const { messages, error, setMessages, isLoading, stop, input, setInput, handleInputChange, handleSubmit } = useChat(
    {
      headers: {
        model: model,
        apitoken: apiToken
      }
    }
  );
  const [currentDailogue, setCurrentDailogue] = useState('')
  const [allMessage, setAllMessage] = useState<IChatMessage[]>([])

  useEffect(() => {
    if (error) {
      toast.error('更换网络或者API试试')
    }
  }, [error])

  useEffect(() => {
    if (currentDailogue) {
      const chatHistory = allMessage.find(msg => msg.id === currentDailogue)?.chatMessage
      if (chatHistory) {
        setMessages(chatHistory)
      }
    }
  }, [currentDailogue])

  useEffect(() => {
    const localToken = localStorage.getItem('apiToken')
    if(localToken){
      setApiToken(localToken)
    }
    const localMessages = localStorage.getItem('AllChatMessages')
    if (!localMessages) {
      localStorage.setItem('AllChatMessages', '')
    } else {
      const AllMessage: IChatMessage[] = JSON.parse(localMessages)
      setAllMessage(AllMessage)
    }
  }, [])

  useEffect(() => {
    if (currentDailogue === '' && messages.filter(item => item.role === 'user')[0]) {
      const currentId = Date.now().toString()
      setCurrentDailogue(currentId)
      const newObj = {
        name: messages.filter(item => item.role === 'user')[0].content,
        chatMessage: messages,
        id: currentId
      };
      allMessage.push(newObj)
      localStorage.setItem('AllChatMessages', JSON.stringify(allMessage))
    } else if (currentDailogue && messages.length !== 0) {
      allMessage.forEach(message => {
        if (message.id === currentDailogue) {
          message.chatMessage = messages
        }
      })
      setAllMessage(allMessage)
      localStorage.setItem('AllChatMessages', JSON.stringify(allMessage))
    }

  }, [messages])

  const selectId = (id: string) => {
    setCurrentDailogue(id)
  }

  const handleDeleteMessage = (messageId: String) => {
    if (messageId === currentDailogue) {
      setCurrentDailogue('')
      setMessages([])
      setInput('')
    }
    const NewMessage = allMessage.filter(message => message.id !== messageId);
    setAllMessage(NewMessage)
    localStorage.setItem('AllChatMessages', JSON.stringify(NewMessage))
  }

  const startNewMessage = () => {
    setCurrentDailogue('')
    setMessages([])
    setInput('')
  }

  const swichModel = (model: string) => {
    setModel(model)
  }

  const handleSetToken = (token: string) => {
    setApiToken(token)
    localStorage.setItem('apiToken', token)
    toast.success('token设置成功')
  }

  return (
    <div
      className='flex w-screen h-screen'
    >
      <ChatSideBar
        handleSetToken={handleSetToken}
        model={model}
        swichModel={swichModel}
        handleDeleteMessage={handleDeleteMessage}
        currentDailogue={currentDailogue}
        selectId={selectId}
        titles={allMessage.map(title => { return { name: title.name, id: title.id } })}
        startNewMessage={startNewMessage}
      />
      <div className="w-full flex  flex-col h-screen relative">
        <div
          className=' absolute top-6 left-4'
        >
          <SelectItems />
        </div>
        <div className="flex-grow h-full">
          <MessageArea
            messages={allMessage.find(msg => msg.id === currentDailogue)?.chatMessage}
          />
        </div>
        <div className="absolute left-0 bottom-7 w-full">
          <div className=" flex relative w-full px-48 justify-center">
            {
              isLoading
              && <div
                onClick={stop}
                className=" absolute text-sm cursor-pointer bottom-16 p-2 gap-2 border rounded-xl flex items-center">
                <CirclePause size={20} />
                停止
              </div>
            }
            <SendForm
              isLoading={isLoading}
              setInput={setInput}
              inputValue={input}
              handleInputValue={handleInputChange}
              handleSubmmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiChatPage