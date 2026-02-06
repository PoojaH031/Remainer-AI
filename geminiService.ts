
import { GoogleGenAI, Type } from "@google/genai";
import { UserInputs, AIResponse } from "./types";

export const generateRoutine = async (inputs: UserInputs): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Generate a clear, friendly daily routine schedule based on these inputs:
    - Wake-up time: ${inputs.wakeUpTime}
    - Work/Study hours: ${inputs.workStudyHours}
    - Meal times: ${inputs.mealTimes}
    - Exercise time: ${inputs.exerciseTime}
    - Relaxation/Break time: ${inputs.relaxTime}
    - Sleep time: ${inputs.sleepTime}

    Ensure the schedule is chronological.
    Each item should have a friendly, positive reminder message.
    Provide exactly one short, powerful motivational line at the end to maintain consistency.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "The specific time or time range for the activity" },
                  activity: { type: Type.STRING, description: "The name of the activity" },
                  reminder: { type: Type.STRING, description: "A friendly, short reminder message" },
                  type: { 
                    type: Type.STRING, 
                    enum: ['wake', 'work', 'meal', 'exercise', 'relax', 'sleep', 'other'] 
                  }
                },
                required: ["time", "activity", "reminder", "type"]
              }
            },
            motivation: { type: Type.STRING, description: "A single motivational line" }
          },
          required: ["schedule", "motivation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate your routine. Please try again.");
  }
};
