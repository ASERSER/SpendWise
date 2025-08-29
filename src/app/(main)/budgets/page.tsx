import { PageHeader } from "@/components/page-header";
import { BudgetList } from "./budget-list";
import { Button } from "@/components/ui/button";

export default function BudgetsPage() {
    return (
        <>
            <PageHeader
                title="Budgets"
                description="Manage your monthly budgets to stay on track."
            >
                {/* This button will trigger the form/dialog for adding a new budget */}
                {/* <Button>Add Budget</Button> */}
            </PageHeader>
            <BudgetList />
        </>
    );
}
