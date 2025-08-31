
"use client";

import { useContext } from "react";
import { PageHeader } from "@/components/page-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TransactionContext } from "../transaction-context";

export default function TransactionsPage() {
    const { transactions } = useContext(TransactionContext);

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
