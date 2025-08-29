"use server";

import { budgetGuidance, type BudgetGuidanceInput } from "@/ai/flows/budget-guidance";

export async function getBudgetGuidance(input: BudgetGuidanceInput) {
  try {
    const result = await budgetGuidance(input);
    return result;
  } catch (error) {
    console.error("Error getting budget guidance:", error);
    return {
      isComplete: false,
      isReasonable: false,
      feedback: "An unexpected error occurred. Please try again later.",
    };
  }
}
