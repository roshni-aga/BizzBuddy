import { GoogleGenAI } from "@google/genai";

export async function getAIAdvice(summary) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const prompt = `
You are BizBuddy AI, a smart operations assistant for small businesses.

Your job:
- Analyze the business metrics below
- Give EXACTLY 3 practical, actionable recommendations
- Keep each recommendation SHORT (max 1 sentence)
- Focus on operations, cash flow, inventory, and staff efficiency
- Do NOT explain reasoning
- Do NOT use long paragraphs
- Output ONLY bullet points
- Tone: professional, clear, practical

Business Data:
Risk Score: ${summary.riskScore}
Low stock items: ${summary.lowStockItems.join(", ") || "None"}
Pending payments: ${summary.pendingPayments}
Active staff: ${summary.activeStaff}

Example output:
• Restock milk within 2 days to avoid stockouts.
• Follow up on pending payments above ₹5,000 this week.
• Reduce inactive staff shifts to lower operational cost.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    if (!result?.text) {
      throw new Error("Empty AI response");
    }
    return result.text.trim();
  } catch (err) {
    console.log("AI ERROR:", err.message);
    return null;
  }
}
