"use server"

import fetch from 'node-fetch';
import FormData from 'form-data';
import { GenerationResponse } from './textToImage';


export async function imageTest(
    imageData: string,
    // prompt: string,
    ceshi: string
) {
    console.log(imageData.length)
    console.log(ceshi)
    const engineId = 'stable-diffusion-v1-6';
    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) throw new Error('Missing Stability API key.');

    // const formData = new FormData();
    // formData.append('init_image', imageData);
    // formData.append('init_image_mode', 'IMAGE_STRENGTH');
    // formData.append('image_strength', 0.35);
    // formData.append('text_prompts[0][text]', prompt);
    // formData.append('cfg_scale', 7);
    // formData.append('samples', 1);
    // formData.append('steps', 30);

    // const response = await fetch(
    //     `${apiHost}/v1/generation/${engineId}/image-to-image`,
    //     {
    //         method: 'POST',
    //         headers: {
    //             ...formData.getHeaders(),
    //             Accept: 'application/json',
    //             Authorization: `Bearer ${apiKey}`,
    //         },
    //         body: formData,
    //     }
    // );

    // if (!response.ok) {
    //     throw new Error(`Non-200 response: ${await response.text()}`);
    // }

    // const responseJSON = (await response.json()) as GenerationResponse;
    // return responseJSON
}
