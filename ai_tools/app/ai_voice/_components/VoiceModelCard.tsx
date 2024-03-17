import React from 'react'
import { Pointer, FilePenLine, Trash2 } from 'lucide-react'
const VoiceModelCard = () => {
    return (
        <div className="h-40 border-slate-600 border rounded-md bg-slate-700 flex flex-col">
            <div className="grow p-4 border-b">
                <div className="text-2xl">模型名称</div>
                <div className="mt-4 ">这是模型的简要描述</div>
            </div>
            <div className="grid grid-cols-3  divide-x">
                <div className="py-3 hover:text-blue-200 gap-2 flex justify-center cursor-pointer items-center">
                    <Pointer size={18} />
                    使用
                </div>
                <div className="py-3 hover:text-blue-200 gap-2 flex justify-center cursor-pointer items-center">
                    <FilePenLine size={18} />
                    编辑
                </div>
                <div className="py-3 hover:text-blue-200 gap-2 flex justify-center cursor-pointer items-center">
                    <Trash2 size={18} />
                    删除
                </div>
            </div>
        </div>
    )
}

export default VoiceModelCard