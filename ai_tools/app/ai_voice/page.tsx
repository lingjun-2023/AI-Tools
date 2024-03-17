"use client"
import React, { useState, useEffect } from 'react'
import SelectItems from '@/components/SelectItems'
import { CirclePlus } from 'lucide-react'
import VoiceModelCard from './_components/VoiceModelCard'
import PublicVoiceModel from './_components/PublicVoiceModel'
import { getAllVoices } from './_actions/getAllVoices'
import { IVoiceInfo } from './_components/PublicVoiceModel'
import toast from 'react-hot-toast'
import AudioPlayer from './_components/AudioPlayer'

const AiVoicePage = () => {
  const [publicVoice, setPublicVoice] = useState(false)
  const [voicesInfo, setVoicesInfo] = useState<IVoiceInfo[] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<IVoiceInfo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllVoices()
      .then(voices => {
        setLoading(true)
        setVoicesInfo(voices.voices)
      })
      .catch(err => toast.error('出错了，请重试'))
      .finally(() => setLoading(false))
  }, [])

  const hanldePlayer = () => {
    setIsPlaying(pre => !pre)
  }

  const handleChangePlayer = (playInfo: IVoiceInfo) => {
    setCurrentPlayer(playInfo)
  }

  if(loading){
    return <div className="">加载中</div>
  }

  return (
    <div
      className='h-screen relative text-slate-50 w-screen px-14'
    >
      <div className="grid-cols-3 grid items-center justify-between pt-8">
        <SelectItems />

        <div className="p-1 grid grid-cols-2 text-sm border border-slate-600 bg-slate-700 rounded-md">
          <button
            onClick={() => setPublicVoice(false)}
            className={`px-4 py-2 ${!publicVoice ? 'bg-blue-500' : 'hover:bg-slate-500'} rounded-md `}
          >
            自定义库
          </button>
          <button
            onClick={() => setPublicVoice(true)}
            className={`px-4 ${publicVoice ? 'bg-blue-500' : 'hover:bg-slate-500'} py-2 rounded-md `}
          >
            公共库
          </button>
        </div>
      </div>
      {
        !publicVoice
          ? (<>
            <div className="text-2xl mt-8">
              生成声音模型
            </div>
            <div className="grid mt-6 grid-cols-3 gap-6 rounded-md shadow-sm">
              <div className=" h-40 cursor-pointer border-slate-600 hover:shadow-md hover:shadow-white border justify-center gap-2 rounded-md bg-slate-700 flex flex-col items-center">
                <CirclePlus size={58}
                  className='stroke-1'
                />
                添加自定义模型
              </div>
              <VoiceModelCard />
              <VoiceModelCard />
              <VoiceModelCard />
              <VoiceModelCard />
            </div>
          </>)
          : <PublicVoiceModel
            handleChangePlayer={handleChangePlayer}
            voicesInfo={voicesInfo}
          />
      }

      

      {currentPlayer &&
        <div className="absolute left-0 bottom-2 w-screen">
          <div className="px-24 w-full">
            <AudioPlayer
              setIsPlaying={setIsPlaying}
              currentPlayer={currentPlayer}
              hanldePlayer={hanldePlayer}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      }

    </div>
  )
}

export default AiVoicePage