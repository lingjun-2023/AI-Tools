import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link';

export interface IList {
    ImageUrl: string;
    Title: string;
    Description: string;
    Link: string
}

interface Props {
    list: IList
}

const MainCard = ({
    list
}: Props) => {
    return (
        <div
            className='h-72 w-80 hover:scale-105 transform transition-all bg-gradient-to-b from-slate-800 to-slate-600  rounded-xl p-4 flex flex-col justify-between'
        >
            <div className="w-full h-32 rounded-xl relative">
                <Image
                    src={list.ImageUrl}
                    alt={list.Title}
                    fill
                    className=' absolute rounded-lg object-cover'
                    priority
                />
            </div>
            <div className="text-xl">
                {list.Title}
            </div>
            <div className="">
                {list.Description}
            </div>

            <Button
                className=' bg-gradient-to-r transform transition-all hover:scale-105 from-blue-800 to-blue-600'
            >
                <Link
                    href={list.Link}

                >
                    立即体验
                </Link>
            </Button>
        </div>
    )
}

export default MainCard