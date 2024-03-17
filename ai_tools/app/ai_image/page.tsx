'use client'
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import TopBar from '@/components/TopBar'
import SelectItems from '@/components/SelectItems'
import SendForm from '../../components/SendForm'
import ImageGallary from './_components/ImageGallary'
import { PencilLine } from 'lucide-react'
import ParamSetting from './_components/ParamSetting'
import { generateImages } from './_actions/textToImage'
import { GenerationResponse } from './_actions/textToImage'
import Image from 'next/image'
import toast from 'react-hot-toast'

const AiImagePage = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectImage] = useState<string | null>(null)
  const [imageData, setImageData] = useState<GenerationResponse | null>(null)
  const [fileData, setFileData] = useState<string | null>(null)

  const handleInputValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputValue('')

    const imageToImage = async () => {
      try {
        const data = await fetch('/api/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            prompt: inputValue,
            imageData: fileData
          }),
        })

        const response = await data.json()

        if (response.success) {
          setImageData(response.message)
          setSelectImage(response.message.artifacts[0].base64)
        } else {
          toast.error(response.message)
        }

      } catch (error) {
        toast.error('出错了')
      }
    }

    try {
      setLoading(true)
      if (fileData) {
        imageToImage()
      } else {
        const data = await generateImages(inputValue)
        setImageData(data);
        setSelectImage(data.artifacts[0].base64)
        console.log('生成image data', imageData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownLoadImage = () => {
    function downloadBase64AsPNG(base64Data: string, fileName: string) {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = fileName;
      link.target = '_blank'; // 将链接打开在新的标签页中

      // 打开链接以触发下载
      link.click()
    }

    // 示例用法
    const base64Data = `data:image/png;base64,${selectedImage}`; // 这里是您的 Base64 数据
    const date = Date.now().toString()
    const fileName = `${date}.png`; // 下载的文件名
    downloadBase64AsPNG(base64Data, fileName);
  }

  const handleOnclick = (value: string) => {
    setSelectImage(value)
  }

  const handleFileInput = async (file: File) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const base64Data = reader.result as string;
      setFileData(base64Data);
    };
  }

  return (
    <div
      className='h-screen w-screen'
    >
      {loading &&
        <div className="flex fixed w-screen h-screen items-center justify-center bg-black bg-opacity-50">
          正在加载中...
        </div>
      }

      <div className="flex p-8 px-14 items-center justify-between">
        <SelectItems />
        <div className="flex items-center  gap-4">
          <div className="flex hover:bg-slate-300 bg-[#D9D9D9] p-2 cursor-pointer text-black px-4 text-sm rounded-2xl gap-2 items-center">
            <PencilLine size={18} />
            编辑
          </div>
          <button
            disabled={selectedImage === null ? true : false}
            onClick={handleDownLoadImage}
            className="flex hover:bg-blue-600 bg-blue-500 p-2 px-4 text-sm rounded-2xl gap-2 items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.21783 20.9384L7.1005 21.6792H7.1005L7.21783 20.9384ZM3.06156 16.7822L3.80232 16.6648L3.06156 16.7822ZM20.9384 16.7822L21.6792 16.8995V16.8995L20.9384 16.7822ZM16.7822 20.9384L16.8995 21.6792H16.8995L16.7822 20.9384ZM20.6 10.5496C20.3513 10.2184 19.8811 10.1516 19.5499 10.4003C19.2187 10.6491 19.1519 11.1192 19.4007 11.4504L20.6 10.5496ZM4.59931 11.4504C4.84808 11.1192 4.78126 10.6491 4.45007 10.4003C4.11888 10.1516 3.64873 10.2184 3.39996 10.5496L4.59931 11.4504ZM12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3H12.75ZM8.58768 12.534C8.33033 12.2095 7.8586 12.155 7.53403 12.4123C7.20946 12.6697 7.15497 13.1414 7.41232 13.466L8.58768 12.534ZM9.39785 14.763L8.81016 15.2289L9.39785 14.763ZM14.6022 14.763L14.0145 14.297L14.6022 14.763ZM16.5877 13.466C16.845 13.1414 16.7905 12.6697 16.466 12.4123C16.1414 12.155 15.6697 12.2095 15.4123 12.534L16.5877 13.466ZM11.7493 16.9801L11.6313 17.7208L11.6313 17.7208L11.7493 16.9801ZM12.2507 16.9801L12.3687 17.7208L12.3687 17.7208L12.2507 16.9801ZM20.25 14V15H21.75V14H20.25ZM15 20.25H9V21.75H15V20.25ZM3.75 15V14H2.25V15H3.75ZM9 20.25C8.04233 20.25 7.65082 20.2477 7.33515 20.1977L7.1005 21.6792C7.56216 21.7523 8.09965 21.75 9 21.75V20.25ZM2.25 15C2.25 15.9003 2.24767 16.4378 2.32079 16.8995L3.80232 16.6648C3.75233 16.3492 3.75 15.9577 3.75 15H2.25ZM7.33515 20.1977C5.51661 19.9096 4.09035 18.4834 3.80232 16.6648L2.32079 16.8995C2.71048 19.3599 4.64012 21.2895 7.1005 21.6792L7.33515 20.1977ZM20.25 15C20.25 15.9577 20.2477 16.3492 20.1977 16.6648L21.6792 16.8995C21.7523 16.4378 21.75 15.9003 21.75 15H20.25ZM15 21.75C15.9003 21.75 16.4378 21.7523 16.8995 21.6792L16.6648 20.1977C16.3492 20.2477 15.9577 20.25 15 20.25V21.75ZM20.1977 16.6648C19.9096 18.4834 18.4834 19.9096 16.6648 20.1977L16.8995 21.6792C19.3599 21.2895 21.2895 19.3599 21.6792 16.8995L20.1977 16.6648ZM21.75 14C21.75 12.7064 21.3219 11.5106 20.6 10.5496L19.4007 11.4504C19.9342 12.1607 20.25 13.0424 20.25 14H21.75ZM3.75 14C3.75 13.0424 4.06583 12.1607 4.59931 11.4504L3.39996 10.5496C2.67806 11.5106 2.25 12.7064 2.25 14H3.75ZM11.25 3V16H12.75V3H11.25ZM7.41232 13.466L8.81016 15.2289L9.98553 14.297L8.58768 12.534L7.41232 13.466ZM15.1898 15.2289L16.5877 13.466L15.4123 12.534L14.0145 14.297L15.1898 15.2289ZM8.81016 15.2289C9.35616 15.9176 9.80475 16.4852 10.2055 16.8875C10.6096 17.2932 11.0582 17.6294 11.6313 17.7208L11.8673 16.2395C11.7612 16.2225 11.5913 16.1532 11.2682 15.8289C10.9418 15.5012 10.5543 15.0143 9.98553 14.297L8.81016 15.2289ZM14.0145 14.297C13.4457 15.0143 13.0582 15.5012 12.7318 15.8289C12.4087 16.1532 12.2388 16.2225 12.1327 16.2395L12.3687 17.7208C12.9418 17.6294 13.3904 17.2932 13.7945 16.8875C14.1953 16.4852 14.6438 15.9175 15.1898 15.2289L14.0145 14.297ZM11.6313 17.7208C11.7534 17.7402 11.8766 17.75 12 17.75V16.25C11.9559 16.25 11.9117 16.2465 11.8673 16.2395L11.6313 17.7208ZM12 17.75C12.1234 17.75 12.2466 17.7402 12.3687 17.7208L12.1327 16.2395C12.0883 16.2465 12.0441 16.25 12 16.25V17.75ZM11.25 16V17H12.75V16H11.25Z" fill="white" />
            </svg>
            下载
          </button>
        </div>
      </div>
      {selectedImage &&
        <div className="w-full flex justify-center">
          <Image
            src={`data:image/png;base64,${selectedImage}`}
            alt='图片'
            height={364}
            width={364}
            className='object-cover rounded'
          />
        </div>
      }

      {
        <div className="absolute  top-32 left-14">
          {
            (imageData || loading) &&
            //  放在左侧
            <ImageGallary
              selectedImage={selectedImage}
              imageData={imageData}
              handleOnclick={handleOnclick}
            />
          }
        </div>
      }

      <div className="absolute left-0 bottom-4 w-full">
        <div className="flex flex-col items-center  w-full ">
          <div className="w-[560px] mt-4">
            <SendForm
              setInput={setInputValue}
              inputValue={inputValue}
              handleInputValue={handleInputValue}
              handleSubmmit={handleSubmmit}
            />
            <ParamSetting
              handleFileInput={handleFileInput}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default AiImagePage