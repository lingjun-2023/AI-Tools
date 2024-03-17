import React, { useState } from 'react'
import { useEffect } from 'react'
import VoiceCard from './VoiceCard'

export interface IVoiceInfo {
    description: string | null,
    labels: any,
    name: string,
    preview_url: string,
    voice_id: string
}

interface Props {
    voicesInfo: IVoiceInfo[] | null
    handleChangePlayer:(playInfo: IVoiceInfo)=>void
}

const PublicVoiceModel = ({handleChangePlayer, voicesInfo }: Props) => {

    return (
        <div
            className='mt-8 h-full overflow-y-auto grid grid-cols-3 gap-6 '
        >
            {
                voicesInfo?.map(item => (
                    <VoiceCard
                        key={item.voice_id}
                        handleChangePlayer={handleChangePlayer}
                        voiceInfo={item}
                    />
                ))
            }
        </div>
    )
}

export default PublicVoiceModel