import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateWorkoutPlan = async (userData: {
    goal: string;
    weight: number;
    height: number;
    age: number;
    preferences?: string;
}) => {
    try {
        const contents = [
            {
                text: `As a professional fitness coach, generate a personalized workout plan for a user with the following profile:
                - Goal: ${userData.goal}
                - Weight: ${userData.weight}kg
                - Height: ${userData.height}cm
                - Age: ${userData.age}
                - Preferences/Available Equipment: ${userData.preferences || "None"}

                Return a JSON object with a list of exercises. Each exercise should have:
                - name: Name of the exercise
                - sets: Number of sets
                - reps: Number of reps or duration
                - rest: Rest time between sets
                - caloriesBurned: Estimated calories burned for this exercise (as a number)
                - instruction: Brief instruction on how to perform it.`
            }
        ];

        const config = {
            responseMimeType: "application/json",
            responseJsonSchema: {
                type: "object",
                properties: {
                    routineName: { type: "string" },
                    totalEstimatedCalories: { type: "number" },
                    exercises: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                sets: { type: "number" },
                                reps: { type: "string" },
                                rest: { type: "string" },
                                caloriesBurned: { type: "number" },
                                instruction: { type: "string" }
                            },
                            required: ["name", "sets", "reps", "rest", "caloriesBurned", "instruction"]
                        }
                    }
                },
                required: ["routineName", "totalEstimatedCalories", "exercises"]
            }
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config
        });

        // The response text is JSON based on the config
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};
