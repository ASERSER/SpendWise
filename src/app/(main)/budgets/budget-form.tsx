
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { categories, budgets as existingBudgets } from "@/lib/data";
import { getBudgetGuidance } from "./actions";
import type { BudgetGuidanceOutput } from "@/ai/flows/budget-guidance";
import { Loader2, Sparkles, ThumbsUp } from "lucide-react";

const formSchema = z.object({
  category: z.string().min(1, "Please select a category."),
  amount: z.coerce.number().positive("Amount must be a positive number."),
});

export function BudgetForm() {
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState<BudgetGuidanceOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setGuidance(null);

    const overallBudget = existingBudgets.find(b => b.scope === 'overall');
    const result = await getBudgetGuidance({
        overallBudget: overallBudget?.amount,
        categoryBudgets: [{ category: values.category, budget: values.amount }]
    });

    setGuidance(result);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Budget Helper</CardTitle>
        <CardDescription>Get AI-powered advice for a new budget before adding it.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {guidance && (
              <Alert variant={guidance.isReasonable ? "default" : "destructive"}>
                {guidance.isReasonable ? <ThumbsUp className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                <AlertTitle>{guidance.isReasonable ? "Looks Good!" : "AI Suggestion"}</AlertTitle>
                <AlertDescription>{guidance.feedback}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Get Guidance
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
