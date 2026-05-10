import { Context } from "koa";
import { generateWorkoutPlan } from "../services/workout-assistant";

export default {
    async generate(ctx: Context) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized("Login required");

        const { preferences } = ctx.request.body as any;

        try {
            const result = await generateWorkoutPlan({
                goal: user.goal || "maintain",
                weight: user.weight || 70,
                height: user.height || 170,
                age: user.age || 25,
                preferences: preferences || ""
            });

            return ctx.send({ success: true, result });
        } catch (error: any) {
            console.error("Workout generation error:", error);
            return ctx.internalServerError("Failed to generate workout plan", { error: error.message });
        }
    }
};
