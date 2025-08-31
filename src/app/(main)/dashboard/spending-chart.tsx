
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"
import { useEffect, useState } from "react"

const initialChartData = [
  { month: "Jan", total: 0 },
  { month: "Feb", total: 0 },
  { month: "Mar", total: 0 },
  { month: "Apr", total: 0 },
  { month: "May", total: 0 },
  { month: "Jun", total: 0 },
  { month: "Jul", total: 1570.50 },
  { month: "Aug", total: 0 },
  { month: "Sep", total: 0 },
  { month: "Oct", total: 0 },
  { month: "Nov", total: 0 },
  { month: "Dec", total: 0 },
]

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
}

export function SpendingChart() {
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    setChartData([
      { month: "Jan", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "Feb", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "Mar", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "Apr", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "May", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "Jun", total: Math.floor(Math.random() * 2000) + 1000 },
      { month: "Jul", total: 1570.50 },
      { month: "Aug", total: 0 },
      { month: "Sep", total: 0 },
      { month: "Oct", total: 0 },
      { month: "Nov", total: 0 },
      { month: "Dec", total: 0 },
    ])
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
        <CardDescription>Your spending summary for the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                    <ChartTooltip 
                      cursor={false}
                      content={<ChartTooltipContent 
                        formatter={(value) => formatCurrency(value as number)}
                        indicator="dot" 
                      />} 
                    />
                    <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
