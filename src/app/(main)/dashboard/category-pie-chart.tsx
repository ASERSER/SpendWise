"use client"

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { categories } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

const chartData = [
  { category: "groceries", value: 250.00 },
  { category: "dining", value: 120.50 },
  { category: "transport", value: 50.00 },
  { category: "bills", value: 850.00 },
  { category: "entertainment", value: 300.00 },
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
                <Pie data={chartData} dataKey="value" nameKey="category" innerRadius={60} strokeWidth={5}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartConfig[entry.category]?.color} />
                  ))}
                </Pie>
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
