import { Link2, Settings2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone';

interface Props {
    handleFileInput: (file: File) => void;
}
const ParamSetting = ({
    handleFileInput
}: Props) => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1
    });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            handleFileInput(acceptedFiles[0])
        }

    }, [acceptedFiles])

    return (
        <div
            className='w-full pt-1 items-center flex justify-between'
        >
            <div className=" group relative ">
                <div className="flex  gap-2 text-sm items-center cursor-pointer hover:text-blue-500">
                    <Settings2 size={18} />
                    参数
                </div>
                <div className="absolute  text-sm rounded-md p-2 hidden group-hover:block bottom-5 -left-20 w-48 bg-slate-500">
                    <div className="mb-2">
                        <label
                            className='py-1.5'
                        >
                            cfg_scale
                        </label>
                        <input
                            type="number"
                            className='p-1.5 bg-slate-400 rounded w-full bg-transparent outline-none'
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className='py-1.5'
                        >
                            选择模型
                        </label>
                        <select
                            className='p-1.5 bg-slate-400 rounded w-full'
                            name="" id="">
                            <option value="">选择模型</option>
                            <option value="">gpt-3.5-turbo</option>
                            <option value="">gpt-4</option>
                            <option value="">gpt-3.5-turbo-16k</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label
                            className='py-1.5'
                        >
                            生成数量
                        </label>
                        <select
                            className='p-1.5 bg-slate-400 rounded w-full'
                            name="" id="">
                            <option value="">数量</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">4</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label
                            className='py-1.5'
                        >
                            长宽比
                        </label>
                        <select
                            className='p-1.5 bg-slate-400 rounded w-full'
                            name="" id="">
                            <option value="">长宽比</option>
                            <option value="">1024*1024</option>
                            <option value="">1152x896</option>
                            <option value="">1216x832</option>
                        </select>
                    </div>
                    <button
                        className=' rounded-md hover:bg-blue-600  p-2 flex w-full justify-center bg-blue-500'
                    >
                        确认
                    </button>
                </div>
            </div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <button className="flex cursor-pointer hover:text-blue-500 items-center gap-2 text-sm">
                    <Link2 size={18} />
                    图片
                    {acceptedFiles[0]&& <p>{acceptedFiles[0].name}</p>}
                </button>
            </div>
        </div>
    )
}

export default ParamSetting