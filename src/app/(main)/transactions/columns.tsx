"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { accounts, categories } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import type { Transaction } from "@/lib/types"
import { useEffect, useState } from "react"

// A client-side component to safely render the date
function SafeDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  return <span>{formattedDate}</span>;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "note",
    header: "Details",
    cell: ({ row }) => {
        const categoryId = row.original.categoryId
        const category = categories.find(c => c.id === categoryId)
        const Icon = category?.icon
        return (
            <div className="flex items-center gap-3">
                {Icon && 
                    <div className="flex items-center justify-center bg-muted rounded-md size-8">
                        <Icon className="size-4 text-muted-foreground" />
                    </div>
                }
                <div className="flex flex-col">
                    <span className="font-medium">{row.original.note}</span>
                    <span className="text-sm text-muted-foreground">{category?.name}</span>
                </div>
            </div>
        )
    }
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <SafeDate dateString={row.getValue("date")} />,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
            <Badge variant={type === 'expense' ? 'destructive' : type === 'income' ? 'secondary' : 'outline' } className="capitalize">
                {type}
            </Badge>
        )
    }
  },
    {
    accessorKey: "accountId",
    header: "Account",
    cell: ({ row }) => {
        const account = accounts.find(a => a.id === row.getValue("accountId"));
        return account?.name || "N/A"
    }
    },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const currency = row.original.currency
      
      const formatted = formatCurrency(amount, currency)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
