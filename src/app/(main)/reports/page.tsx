import { PageHeader } from "@/components/page-header";
import { CategoryPieChart } from "../dashboard/category-pie-chart";
import { SpendingChart } from "../dashboard/spending-chart";

export default function ReportsPage() {
    return (
        <>
            <PageHeader 
                title="Reports" 
                description="Analyze your spending patterns and trends." 
            />
            <div className="space-y-6">
                <SpendingChart />
                <CategoryPieChart />
            </div>
        </>
    );
}
