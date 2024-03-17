"use server"

import fetch from 'node-fetch';

export interface GenerationResponse {
    artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
    }>;
}

export async function generateImages(prompt: string,) {
    const engineId = 'stable-diffusion-v1-6';
    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) throw new Error('Missing Stability API key.');
    const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text: prompt,
                },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 2,
        }),
    });

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = (await response.json()) as GenerationResponse;
    return responseJSON
}