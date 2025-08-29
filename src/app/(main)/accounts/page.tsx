import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { accounts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Banknote, CreditCard, Plus, Wallet } from "lucide-react";

const accountIcons = {
    cash: Wallet,
    bank: Banknote,
    card: CreditCard,
};

export default function AccountsPage() {
    return (
        <>
            <PageHeader
                title="Accounts"
                description="Manage your connected accounts and balances."
            >
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                </Button>
            </PageHeader>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map(account => {
                    const Icon = accountIcons[account.type];
                    return (
                        <Card key={account.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</div>
                                <p className="text-xs text-muted-foreground capitalize">{account.type} account</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </>
    );
}
