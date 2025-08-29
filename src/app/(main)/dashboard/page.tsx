import { PageHeader } from "@/components/page-header";
import { SummaryCards } from "./summary-cards";
import { SpendingChart } from "./spending-chart";
import { CategoryPieChart } from "./category-pie-chart";
import { RecentTransactions } from "./recent-transactions";

export default function DashboardPage() {
    return (
        <>
            <PageHeader title="Dashboard" description="Here's a summary of your financial activity." />
            <div className="space-y-6">
                <SummaryCards />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-full lg:col-span-4">
                        <SpendingChart />
                    </div>
                    <div className="col-span-full lg:col-span-3">
                        <CategoryPieChart />
                    </div>
                </div>
                <RecentTransactions />
            </div>
        </>
    )
}
