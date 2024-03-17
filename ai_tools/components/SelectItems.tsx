import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Image, MessageSquareText, Video, PanelRightOpen, MicVocal } from 'lucide-react'
import { listData } from '@/util/data'
import { useRouter } from 'next/navigation'

const SelectItems = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<string | undefined>(undefined)

    useEffect(() => {
        const current = localStorage.getItem('currentPage')
        if (current) {
            console.log('当前地域', current)
            setCurrentPage(current)
        }
    }, [])

    useEffect(() => {
        console.log('测试', currentPage)
    }, [currentPage])

    const hanldeValueChange = (e: string) => {
        localStorage.setItem('currentPage', e)
        if (e === 'index') {
            router.push(`/`)
        } else {
            router.push(`/${e}`)
        }
    }

    return (
        <Select
            value={currentPage}
            onValueChange={(e) => hanldeValueChange(e)}
        >
            <SelectTrigger className="w-[140px] bg-gradient-to-r from-blue-700 to-blue-500 border-none">
                <SelectValue
                    placeholder='切换工具'
                />
            </SelectTrigger>
            <SelectContent
                className='bg-slate-800 border-none text-white'
            >
                <SelectGroup
                >
                    <SelectLabel>切换工具</SelectLabel>

                    <SelectItem value="ai_chat">
                        <button
                            className="flex items-center gap-2">
                            <MessageSquareText size={18} />
                            {listData[0].Title}
                        </button>
                    </SelectItem>
                    <SelectItem value="ai_image">
                        <button
                            className="flex items-center gap-2">
                            <Image size={18} />
                            {listData[1].Title}
                        </button>
                    </SelectItem>
                    <SelectItem value="ai_video">
                        <button
                            className="flex items-center gap-2">
                            <Video size={18} />
                            {listData[2].Title}
                        </button>
                    </SelectItem>
                    <SelectItem value="ai_voice">
                        <button
                            className="flex items-center gap-2">
                            <MicVocal size={18} />
                            {listData[3].Title}
                        </button>
                    </SelectItem>
                    <SelectItem value="index">
                        <button
                            className="flex items-center gap-2">
                            <PanelRightOpen size={18} />
                            返回首页
                        </button>
                    </SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectItems