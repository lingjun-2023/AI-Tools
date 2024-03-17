"use server"

export async function getAllVoices() {
    const options = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            'xi-api-key': process.env.XI_API_KEY as string
        }
    };
    const url = 'https://api.elevenlabs.io/v1/voices'
    try {
        const response = await fetch(url, options);
        const data = await response.json();
         return data
    } catch (error) {
        throw new Error('出错了')
     }
}