import React from 'react'
import { GenerationResponse } from '../_actions/textToImage'
import Image from 'next/image'

interface Props {
    selectedImage: string | null
    imageData: GenerationResponse | null;
    handleOnclick: (value: string) => void;
}

const ImageGallary = ({ selectedImage,imageData, handleOnclick }: Props) => {
    return (
        <div
            className='h-[440px] flex flex-col items-center justify-between py-2 px-4 w-32 rounded-md bg-[#141517]'
        >
            <div className="h-full flex flex-col gap-2 items-center overflow-y-auto">
                {
                    imageData?.artifacts.map(item => (
                        <Image
                            onClick={() => handleOnclick(item.base64)}
                            key={item.base64}
                            src={`data:image/png;base64,${item.base64}`}
                            alt='图片'
                            height={100}
                            width={100}
                            className={`${selectedImage===item.base64?'border border-blue-500':'hover:border border-blue-500'} object-cover rounded cursor-pointer hover:ring-1`}
                        />
                    ))
                }
            </div>
            <div className="flex flex-col border-t pt-8 py-4 gap-4 items-center ">
                <button
                    className='px-4 hover:bg-slate-700 py-2 rounded-2xl border'
                >
                    取消
                </button>
                <button
                    className='px-4  hover:bg-blue-600 py-2 bg-blue-500 rounded-2xl '
                >
                    确定
                </button>
            </div>
        </div>
    )
}

export default ImageGallary