import { CohereClient } from "cohere-ai"

const cohere = new CohereClient({
  token: "MEjWAKX9UH75w4RPSZpSvJrziJbYDwREgEu5Qear",
})

export async function POST(req: Request) {
  try {
    const { height, weight, age, activityLevel, goals } = await req.json()
    
    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100))
    
    const prompt = `Generate a detailed 6-day fitness plan (with Sunday as rest day) based on the following information:
- BMI: ${bmi.toFixed(1)}
- Age: ${age}
- Activity Level: ${activityLevel}
- Goals: ${goals}

Please provide:
1. Weekly meal plan with portions for 6 days (Monday to Saturday)
2. Daily exercise routine for 6 days (Monday to Saturday)
3. Daily water intake recommendation
4. Weekly progress tracking metrics
5. Suggestions for light activities or self-care for Sunday (rest day)`

    const response = await cohere.generate({
      model: 'command',
      prompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return Response.json({ plan: response.generations[0].text })
  } catch (error) {
    return Response.json({ error: 'Failed to generate plan' }, { status: 500 })
  }
}

