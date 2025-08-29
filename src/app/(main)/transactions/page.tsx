import { PageHeader } from "@/components/page-header";
import { transactions } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function TransactionsPage() {
    return (
        <>
            <PageHeader
                title="Transactions"
                description="View and manage all your financial activities."
            />
            <DataTable columns={columns} data={transactions} />
        </>
    )
}
