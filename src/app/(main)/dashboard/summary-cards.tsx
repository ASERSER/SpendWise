import { StatCard } from "@/components/stat-card";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, DollarSign, PiggyBank } from "lucide-react";

export function SummaryCards() {
    // Mock data, in a real app this would come from state or an API
    const totalSpent = 1570.50;
    const totalIncome = 5000.00;
    const remainingBudget = 4000 - 1570.50;
    
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                title="Total Spent (This Month)"
                value={formatCurrency(totalSpent)}
                icon={ArrowDownLeft}
                description="+20.1% from last month"
            />
            <StatCard 
                title="Total Income (This Month)"
                value={formatCurrency(totalIncome)}
                icon={ArrowUpRight}
                description="+180.1% from last month"
            />
            <StatCard 
                title="Remaining Budget"
                value={formatCurrency(remainingBudget)}
                icon={PiggyBank}
                description="Overall monthly budget"
            />
            <StatCard 
                title="Net Flow"
                value={formatCurrency(totalIncome - totalSpent)}
                icon={DollarSign}
                description="Income minus expenses"
            />
        </div>
    )
}
