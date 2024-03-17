import { GenerationResponse } from '@/app/ai_image/_actions/textToImage';
import { NextResponse } from 'next/server';
import FormData from 'form-data'
import fs from 'fs';
import fetch from 'node-fetch'

function saveBase64Image(base64Data: string, outputPath: string): void {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const bufferData = Buffer.from(base64Image, 'base64');

  fs.writeFileSync(outputPath, bufferData);
}

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { imageData, prompt } = await req.json();
    const outputPath = './newoutput.png';
    saveBase64Image(imageData, outputPath);
    const data = fs.readFileSync(outputPath)

    console.log(imageData.length)
    const engineId = 'stable-diffusion-v1-6';
    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
        console.log('api')
        return NextResponse.json({ success: false, message: 'api失效了' })
    }

    const formData = new FormData();
    formData.append('init_image', data);
    formData.append('init_image_mode', 'IMAGE_STRENGTH');
    formData.append('image_strength', 0.35);
    formData.append('text_prompts[0][text]', prompt);
    formData.append('cfg_scale', 7);
    formData.append('samples', 1);
    formData.append('steps', 30);
    const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/image-to-image`,
        {
            method: 'POST',
            headers: {
                ...formData.getHeaders(),
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
        }
    )

    if (!response.ok) {
        const text = await response.text()
        console.log('请求失败',text)
        console.log('请求失败',response.status)

        return NextResponse.json({ success: false, message: '请求失败' })
    }

    const responseJSON = (await response.json()) as GenerationResponse;
    return NextResponse.json({ success: true, message: responseJSON })
}