import { ArrowLeftRight, Settings, PanelRightOpen } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'

interface Props {
    swichModel: (model: string) => void,
    handleSetToken: (token: string) => void,
    model: string
}
const BottomBar = (
    { swichModel, model, handleSetToken }: Props
) => {
    const [value, setValue] = useState('')

    const gptModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-3.5-turbo-16k']
    return (
        <div
            className=' border-t flex flex-col gap-2 pb-4 border-t-slate-500'
        >
            <div className="flex group relative hover:bg-slate-700  mt-2 rounded-md p-2 items-center gap-2">
                <div className=" flex-col gap-2 hidden text-sm bg-slate-500 rounded-lg group-hover:block absolute bottom-8 w-40">
                    <input
                        className='w-full bg-transparent outline-none p-2'
                        type="text"
                        placeholder='输入token'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                        onClick={() => handleSetToken(value)}
                        className='w-full rounded-md flex justify-center hover:bg-blue-500 p-2'
                    >
                        确认
                    </button>
                </div>
                <div className="cursor-pointer gap-2 flex items-center">
                    <Settings size={18} />
                    Token设置
                </div>
            </div>
            <div className=" group relative flex hover:bg-slate-700 p-2 cursor-pointer rounded-md items-center gap-2">
                <div className="py-2 hidden text-sm bg-slate-500 rounded-lg group-hover:block absolute bottom-8 w-40">
                    {gptModels.map(item => (
                        <div
                            onClick={() => swichModel(item)}
                            key={item}
                            className={`${model === item ? 'bg-blue-500' : 'hover:bg-slate-600'} p-2 flex justify-center `}>
                            {item}
                        </div>
                    ))}
                </div>
                <ArrowLeftRight size={18} />
                切换模型
            </div>
            <Link
                href={'/'}
                className="flex hover:bg-slate-700 p-2 cursor-pointer rounded-md items-center gap-2">
                <PanelRightOpen size={18} />
                返回首页
            </Link>
        </div>
    )
}

export default BottomBar