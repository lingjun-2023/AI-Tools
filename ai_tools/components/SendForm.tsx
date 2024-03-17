'use client'
import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { SendHorizontal, Mic } from 'lucide-react'
import { ChatRequestOptions } from 'ai';

interface Props {
    inputValue: string;
    handleInputValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    setInput: (value: string) => void,
    isLoading?: boolean,
}

const SendForm = ({ isLoading, inputValue, setInput, handleInputValue, handleSubmmit }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [listening, setListening] = useState(false)

    useEffect(() => {
        adjustTextareaHeight();
    }, [textareaRef.current?.value]);

    useEffect(() => {
        let recognition: SpeechRecognition | null = null;
        const stopRecognition = () => {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
        };


        const startRecognition = () => {
            recognition = new window.webkitSpeechRecognition;; // 使用webkitSpeechRecognition来支持中文语音识别
            if (recognition) {
                recognition.lang = 'zh-CN'; // 设置语言为中文
                recognition.continuous = true; // 设置连续识别模式，以实现流式结

                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    const result = event.results[event.results.length - 1][0].transcript;
                    console.log(result)
                    setInput(inputValue.concat(result))
                };

                recognition.start();
            }

        };

        if (listening) {
            startRecognition()
        } else {
            stopRecognition()
        }
        return () => stopRecognition();
    }, [listening])

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.key === 'Enter') {
                // 执行你的操作
                if (isLoading) {
                    return
                }
                handleSubmmit(event as FormEvent<HTMLFormElement>);
                setInput('')
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [inputValue]);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        handleInputValue(event)
        adjustTextareaHeight();
    };

    const handleStartListenning = () => {
        setListening(pre => !pre)
    }

    return (
        <form
            aria-disabled={isLoading}
            onSubmit={handleSubmmit}
            className='flex px-4 py-2 rounded-md w-full bg-[#4B4E53] shadow-lg   items-center'
        >
            <textarea
                value={inputValue}
                onChange={handleTextChange}
                ref={textareaRef}
                style={{ resize: 'none', height: '3em ' }}
                className='w-full h-auto focus:outline-none bg-transparent'
                placeholder='Type a message...'
            />
            <div className="flex items-center gap-3">
                <Mic
                    onClick={handleStartListenning}
                    className={`${listening ? 'text-blue-500' : ''} cursor-pointer `}
                    size={20}
                />
                <button
                    className=''
                >
                    <SendHorizontal
                        size={20}
                    />
                </button>
            </div>

        </form>
    )
}

export default SendForm

