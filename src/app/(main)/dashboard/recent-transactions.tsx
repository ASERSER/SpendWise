"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions, categories, accounts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, Repeat } from "lucide-react";
import { useEffect, useState } from "react";

const getCategory = (id: string | null) => categories.find(c => c.id === id);
const getAccount = (id: string) => accounts.find(a => a.id === id);

// A client-side component to safely render the date
function SafeDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  if (!formattedDate) {
    return null;
  }

  return <>{formattedDate}</>;
}


export function RecentTransactions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>A list of your most recent expenses and income.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Details</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead className="hidden sm:table-cell">Account</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.slice(0, 5).map(tx => {
                            const category = getCategory(tx.categoryId);
                            const account = getAccount(tx.accountId);
                            const Icon = 
                                tx.type === 'expense' ? ArrowDownLeft :
                                tx.type === 'income' ? ArrowUpRight : Repeat;

                            return (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center bg-muted rounded-full size-10">
                                                {category?.icon ? <category.icon className="size-5" /> : <Icon className="size-5" />}
                                            </div>
                                            <div>
                                                <div className="font-medium">{tx.note}</div>
                                                <div className="text-sm text-muted-foreground">
                                                  <SafeDate dateString={tx.date} />
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant={tx.type === 'expense' ? 'destructive' : tx.type === 'income' ? 'secondary' : 'outline' } className="capitalize">
                                            {tx.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{account?.name}</TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(tx.amount, tx.currency)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
