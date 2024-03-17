import React, { useRef } from 'react'
import { Volume2, Pointer } from 'lucide-react'
import { IVoiceInfo } from './PublicVoiceModel'

interface Props {
    voiceInfo: IVoiceInfo
    handleChangePlayer: (playInfo: IVoiceInfo) => void
}

const VoiceCard = ({ handleChangePlayer, voiceInfo }: Props) => {

    return (
        <div className="h-40 border-slate-600 border rounded-md bg-slate-700 flex flex-col">
            <div className="grow p-4 border-b">
                <div className="text-2xl">{voiceInfo.name}</div>
                <div className="mt-4 ">{voiceInfo.description}</div>
                <div className="flex items-center text-sm gap-2">
                    {voiceInfo.labels && Object.values(voiceInfo.labels).map((label: any) => (
                        <span key={label}>{label}</span>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2  divide-x">
                <button
                    onClick={() => handleChangePlayer(voiceInfo)}
                    className="py-3 hover:text-blue-200 gap-2 flex justify-center cursor-pointer items-center">
                    <Volume2 size={18} />
                    试听
                </button>
                <button className="py-3 hover:text-blue-200 gap-2 flex justify-center cursor-pointer items-center">
                    <Pointer size={18} />
                    使用
                </button>
            </div>
        </div>)
}

export default VoiceCard