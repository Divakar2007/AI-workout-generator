
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, WorkoutPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        workoutName: {
            type: Type.STRING,
            description: "A creative and motivating name for the workout plan, e.g., 'Full Body Blast'."
        },
        description: {
            type: Type.STRING,
            description: "A brief, 1-2 sentence description of the workout's goal."
        },
        exercises: {
            type: Type.ARRAY,
            description: "A list of exercises in the workout plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the exercise." },
                    sets: { type: Type.STRING, description: "Number of sets, e.g., '3 sets' or 'N/A'." },
                    reps: { type: Type.STRING, description: "Number of repetitions or duration, e.g., '10-12 reps' or '45 seconds'." },
                    rest: { type: Type.STRING, description: "Rest period after completing all sets for this exercise, e.g., '60 seconds'." },
                    detailedDescription: {
                        type: Type.STRING,
                        description: "A detailed, step-by-step guide on how to perform the exercise correctly, focusing on form and technique. Write it clearly for a beginner to understand, using line breaks for each step."
                    }
                },
                required: ["name", "sets", "reps", "rest", "detailedDescription"]
            }
        }
    },
    required: ["workoutName", "description", "exercises"]
};


export const generateWorkout = async (formData: FormData): Promise<WorkoutPlan> => {
    const prompt = `
You are a world-class fitness coach and personal trainer. Your task is to generate a personalized workout plan based on the following user specifications.

User Specifications:
- Workout Type: ${formData.workoutType}
- Target Muscle Group: ${formData.muscleGroup}
- Fitness Level: ${formData.fitnessLevel}
- Desired Duration: Approximately ${formData.duration} minutes
- Available Equipment: ${formData.equipment.join(', ')}

Please generate a structured and effective workout plan that fits these criteria. The plan must have a creative, motivating name, a brief description of its goal, and for each exercise, a detailed step-by-step guide on how to perform it. The total workout time, including warm-up, main exercises, and cool-down (if applicable), should align with the desired duration. Ensure the exercises are appropriate for the user's fitness level and available equipment.

The response MUST be a JSON object that strictly adheres to the provided schema. Do not include any introductory text, explanations, markdown formatting like \`\`\`json, or any other text outside of the JSON object itself.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
                temperature: 0.8,
            },
        });

        const text = response.text.trim();
        const parsedPlan: WorkoutPlan = JSON.parse(text);
        
        if (!parsedPlan.workoutName || !parsedPlan.exercises || parsedPlan.exercises.length === 0) {
          throw new Error("AI returned an incomplete workout plan. Please try different options.");
        }

        return parsedPlan;

    } catch (error) {
        console.error("Error generating workout from Gemini API:", error);
        throw new Error("Failed to generate workout. The AI model may be temporarily unavailable or the request was blocked. Please check your inputs and try again.");
    }
};