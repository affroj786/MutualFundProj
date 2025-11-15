import { MutualFund } from "../types";

export async function generateFundInsight(
  fund: MutualFund,
  query: string
): Promise<string> {
  const res = await fetch("/api/genai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fund, query })
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result?.candidates?.[0]?.content || "No response";
}

