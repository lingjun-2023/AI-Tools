import React, { useEffect, useRef } from 'react'
import { Message } from 'ai'
import Markdown from '@/components/Markdown'
import { debounce } from 'lodash';

interface props {
  messages: Message[] | undefined
}

const MessageArea = ({ messages }: props) => {

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const handleScrollToBottom = () => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  };
  
  const debouncedHandleScrollToBottom = debounce(handleScrollToBottom, 30);
  

  useEffect(() => {
    if (messagesContainerRef.current) {
      debouncedHandleScrollToBottom();
    }
  
    return () => {
      debouncedHandleScrollToBottom.cancel(); // 取消debounce函数
    };
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      style={{ scrollBehavior: 'smooth' }}
      className='h-full pt-4 pb-36  overflow-y-auto'
    >
      {!messages &&
        <div className="h-full text-xl w-full flex justify-center items-center">
          <div className=" flex flex-col items-center">
            <div className="text-3xl mb-4 text-blue-500">
              Ai-Tools
            </div>
            <div className="">
              输入提示词与 AI 进行对话
            </div>
          </div>
        </div>
      }
      {messages?.map(item => (
        <div
          key={item.id}
          className="">
          <div className={`flex items-start py-4 gap-5 px-44 ${item.role === 'assistant' && 'bg-[#2a2c34]'}`}>
            <div className={`w-5 flex-shrink-0 h-5 rounded-full ${item.role === 'user' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <div className=" leading-normal">
              <Markdown
                content={item.content}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageArea