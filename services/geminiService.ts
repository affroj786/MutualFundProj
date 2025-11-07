
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MutualFund } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateFundInsight = async (fund: MutualFund, query: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert financial analyst AI, providing clear, objective, and easy-to-understand insights about mutual funds.
      Do not provide financial advice. Your goal is to educate the user.

      Analyze the following mutual fund based on the data provided and answer the user's query.

      **Fund Information:**
      - **Name:** ${fund.name}
      - **Category:** ${fund.category}
      - **Description:** ${fund.description}
      - **Risk Level:** ${fund.riskLevel}
      - **Expense Ratio:** ${fund.expenseRatio}%
      - **Top Holdings:** ${fund.holdings.map(h => `${h.name} (${h.percentage}%)`).join(', ')}

      **User Query:** "${query}"

      **Your Analysis:**
      Provide a concise and well-structured response. If the query is broad, provide a general analysis covering structure, risks, and suitability.
      Format your response using markdown for better readability (e.g., use bullet points, bold text).
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating fund insight:", error);
    return "Sorry, I was unable to generate insights for this fund at the moment. Please try again later.";
  }
};

export const generateArticleIdeas = async (topic: string): Promise<string> => {
    try {
        const prompt = `
        You are an AI assistant for a financial advisor. Your task is to brainstorm engaging article ideas for investors.
        The main topic is: "${topic}".
        
        Generate 5 creative and informative article titles based on this topic. 
        For each title, provide a brief 1-2 sentence description of what the article would cover.
        
        Format the output as a numbered list.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("Error generating article ideas:", error);
        return "Could not generate article ideas at this time.";
    }
}
