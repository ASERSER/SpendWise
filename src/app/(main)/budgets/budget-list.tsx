import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgets } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { BudgetForm } from "./budget-form";

const getBudgetColor = (percentage: number) => {
    if (percentage > 100) return "bg-destructive";
    if (percentage > 80) return "bg-yellow-500";
    return "bg-primary";
};

export function BudgetList() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <div className="grid gap-4 md:grid-cols-2">
                    {budgets.map((budget) => {
                        const percentage = (budget.spent / budget.amount) * 100;
                        return (
                            <Card key={budget.id}>
                                <CardHeader>
                                    <CardTitle>{budget.name}</CardTitle>
                                    <CardDescription>
                                        {formatCurrency(budget.spent)} spent of {formatCurrency(budget.amount)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Progress value={percentage} indicatorClassName={getBudgetColor(percentage)} />
                                    <p className="text-sm text-muted-foreground mt-2">{formatCurrency(budget.amount - budget.spent)} remaining</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <div>
                <BudgetForm />
            </div>
        </div>
    )
}
