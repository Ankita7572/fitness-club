export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      throw new Error("NVIDIA_API_KEY is not configured");
    }

    const response = await fetch(invokeUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "google/gemma-4-31b-it",
        chat_template_kwargs: { enable_thinking: false },
        max_tokens: 2500,
        stream: false,
        temperature: 0.7,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`NVIDIA API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error("Invalid response from NVIDIA API");
    }

    return Response.json({ text: generatedText })
  } catch (error: any) {
    console.error("API Error:", error)
    return Response.json({ error: error.message || 'Failed to generate plan' }, { status: 500 })
  }
}
