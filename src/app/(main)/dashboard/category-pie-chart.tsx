"use client"

import { Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { categories } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

const chartData = [
  { category: "Groceries", value: 250.00, fill: "var(--color-groceries)" },
  { category: "Dining", value: 120.50, fill: "var(--color-dining)" },
  { category: "Transport", value: 50.00, fill: "var(--color-transport)" },
  { category: "Bills", value: 850.00, fill: "var(--color-bills)" },
  { category: "Entertainment", value: 300.00, fill: "var(--color-entertainment)" },
];

const chartConfig = categories.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = {
        label: category.name,
        color: category.color,
    };
    return acc;
    }, {} as any);


export function CategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Spending by category for this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <ChartTooltip 
                    cursor={false}
                    content={<ChartTooltipContent 
                        formatter={(value) => formatCurrency(value as number)}
                        hideLabel 
                    />} 
                />
                <Pie data={chartData} dataKey="value" nameKey="category" innerRadius={60} strokeWidth={5} />
                <ChartLegend
                    content={<ChartLegendContent nameKey="category" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
            </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
