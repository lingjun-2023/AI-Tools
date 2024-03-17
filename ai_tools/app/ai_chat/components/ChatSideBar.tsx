import { MessageSquare, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import BottomBar from './BottomBar'

interface Props {
    handleSetToken: (token: string) => void,
    model: string,
    currentDailogue: string,
    startNewMessage: () => void;
    titles: { name: string, id: string }[],
    selectId: (id: string) => void,
    handleDeleteMessage: (id: string) => void,
    swichModel: (model: string) => void
}

const ChatSideBar = ({ handleSetToken, model, swichModel, handleDeleteMessage, currentDailogue, selectId, titles, startNewMessage }: Props) => {

    return (
        <div
            className='bg-gray-950 shrink-0 p-3 flex flex-col justify-between  w-64 border-r border-r-slate-500'
        >
            <div className="w-full">
                <div
                    onClick={startNewMessage}
                    className="flex cursor-pointer items-center p-2 gap-2 border border-slate-500 rounded-md">
                    <Plus size={18} />
                    New chat
                </div>
                <div className="flex w-full flex-col gap-1 mt-3">
                    {titles.map(title => (
                        <div
                            key={title.id}
                            className={`p-2 ${currentDailogue === title.id ? 'bg-slate-700' : 'hover:border'}  cursor-pointer items-center rounded-md flex gap-2 justify-between`}>
                            <div
                                onClick={() => selectId(title.id)}
                                className="flex items-center gap-2"
                            >
                                <MessageSquare
                                    className='shrink-0'
                                    size={15}
                                />
                                <span
                                    className=' w-40  overflow-x-hidden line-clamp-1'
                                >
                                    {title.name}
                                </span>
                            </div>
                            <TooltipProvider>
                                <Tooltip
                                >
                                    <TooltipTrigger>
                                        <Trash2
                                            onClick={() => handleDeleteMessage(title.id)}
                                            className='hover:text-blue-400'
                                            size={15}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>删除</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))
                    }
                </div>
            </div>
            <BottomBar
                handleSetToken={handleSetToken}
                model={model}
                swichModel={swichModel}
            />
        </div>
    )
}


export default ChatSideBar