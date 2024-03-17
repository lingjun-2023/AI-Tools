import React, { useEffect, useRef, useState } from 'react'
import { Play, Pause, Download } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { IVoiceInfo } from './PublicVoiceModel'

interface Props {
    isPlaying: boolean,
    hanldePlayer: () => void,
    currentPlayer: IVoiceInfo,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
    return formatted;
}

const AudioPlayer = ({
    isPlaying,
    hanldePlayer,
    currentPlayer,
    setIsPlaying
}: Props) => {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [player, setPlayer] = useState<IVoiceInfo | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying])

    useEffect(() => {
        if (audioRef.current) {
            setCurrentTime(0)
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.removeAttribute('src');
            audioRef.current.load();
            setIsPlaying(false)
        }
        setPlayer(currentPlayer)
        setIsPlaying(true)
    }, [currentPlayer])

    const handleEnded = (): void => {
        setIsPlaying(false);
    };

    const handleChange = (value: number[]): void => {
        // 处理滑动条值的变化
        setCurrentTime(value[0])
        if (audioRef.current?.currentTime) {
            audioRef.current.currentTime = (value[0] / 100) * audioRef.current?.duration!;
        }
    };

    return (
        <div
            className='flex shadow shadow-slate-500 gap-8 justify-between p-3  bg-slate-500 rounded-lg h-24 w-full items-center'
        >
            {
                player && <>
                    <div
                        onClick={hanldePlayer}
                        className=" w-16 cursor-pointer bg-slate-700 h-16 rounded-full flex items-center justify-center">
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}

                        <audio
                            onTimeUpdate={(e) => {
                                setCurrentTime((e.currentTarget.currentTime / audioRef.current?.duration!) * 100)
                            }}
                            ref={audioRef}
                            preload="metadata"
                            onEnded={handleEnded}
                        >
                            <source type="audio/mpeg" src={player.preview_url} />
                        </audio>
                    </div>
                    <div className="grow">
                        <div className="">{currentPlayer.name}</div>
                        <div className="flex gap-4 items-center">
                            <Slider
                                defaultValue={[0]}
                                max={100}
                                value={[currentTime]}
                                onValueChange={handleChange}
                                className={"w-full cursor-pointer"}
                            />
                            <div className="flex text-sm gap-4 items-center">
                                <span>0.00</span>
                                <span>{audioRef.current && formatDurationDisplay(audioRef.current.duration)}</span>
                            </div>
                            <div className="flex items-center">
                                <Download
                                    size={24}
                                    className='text-slate-200 hover:text-white cursor-pointer '
                                />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default AudioPlayer