import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, genre } = await req.json();

    const enhancedPrompt = `${prompt}. Style: ${getStyleForGenre(genre)}, highly detailed, cinematic lighting, digital art`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    return NextResponse.json({
      imageUrl: response.data?.[0]?.url || '',
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

function getStyleForGenre(genre: string): string {
  const styles: Record<string, string> = {
    fantasy: 'epic fantasy art with magical elements and ethereal atmosphere',
    scifi: 'futuristic sci-fi concept art with advanced technology',
    romance: 'romantic and dreamy artistic style with soft lighting',
    thriller: 'dark and moody atmosphere with dramatic shadows',
    comedy: 'vibrant and whimsical art style with expressive characters',
    horror: 'dark horror aesthetic with eerie atmosphere and unsettling elements',
    mystery: 'noir-inspired mystery aesthetic with dramatic lighting',
    adventure: 'dynamic adventure art with sense of exploration and excitement',
  };

  return styles[genre] || styles.fantasy;
}
