import { PageHeader } from "@/components/page-header";
import { BudgetList } from "./budget-list";

export default function BudgetsPage() {
    return (
        <>
            <PageHeader
                title="Budgets"
                description="Manage your monthly budgets to stay on track."
            />
            <BudgetList />
        </>
    );
}
