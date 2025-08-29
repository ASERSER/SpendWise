'use server';

/**
 * @fileOverview Provides AI-powered guidance for setting monthly budgets.
 *
 * - budgetGuidance - A function that analyzes budget parameters and provides feedback.
 * - BudgetGuidanceInput - The input type for the budgetGuidance function.
 * - BudgetGuidanceOutput - The return type for the budgetGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetGuidanceInputSchema = z.object({
  overallBudget: z.number().optional().describe('The user\u2019s total monthly budget.'),
  categoryBudgets: z
    .array(
      z.object({
        category: z.string().describe('The category for the budget.'),
        budget: z.number().describe('The budget amount for the category.'),
      })
    )
    .optional()
    .describe('An array of category budgets.'),
});
export type BudgetGuidanceInput = z.infer<typeof BudgetGuidanceInputSchema>;

const BudgetGuidanceOutputSchema = z.object({
  isComplete: z.boolean().describe('Whether all required budget parameters are present.'),
  isReasonable: z.boolean().describe('Whether the budget parameters are within reasonable ranges.'),
  feedback: z.string().describe('AI-generated feedback on the budget parameters.'),
});
export type BudgetGuidanceOutput = z.infer<typeof BudgetGuidanceOutputSchema>;

export async function budgetGuidance(input: BudgetGuidanceInput): Promise<BudgetGuidanceOutput> {
  return budgetGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetGuidancePrompt',
  input: {schema: BudgetGuidanceInputSchema},
  output: {schema: BudgetGuidanceOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the provided budget information and provide guidance.

  Assess whether the user has provided all necessary information to create a budget. If any parameters are missing, isComplete should be false.

  Determine if the budget amounts are within reasonable ranges, by making an educated guess based on the budget categories and total budget amount, given the information below. isReasonable should be true if the amounts are reasonable, and false otherwise.

  Provide helpful feedback to the user. Be encouraging and positive.

  Overall Budget: {{overallBudget}}
  Category Budgets:
  {{#each categoryBudgets}}
  - Category: {{category}}, Budget: {{budget}}
  {{/each}}

  Output:
  {{~output schema=BudgetGuidanceOutputSchema~}}
  `,
});

const budgetGuidanceFlow = ai.defineFlow(
  {
    name: 'budgetGuidanceFlow',
    inputSchema: BudgetGuidanceInputSchema,
    outputSchema: BudgetGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
