"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Landmark,
  Plus,
  Repeat,
  LayoutDashboard,
  Wallet,
  Target,
} from "lucide-react";
import { useState } from "react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddExpenseDialog } from "./add-expense-dialog";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: Repeat },
  { href: "/accounts", label: "Accounts", icon: Wallet },
  { href: "/budgets", label: "Budgets", icon: Target },
  { href: "/reports", label: "Reports", icon: BarChart2 },
];

export function AppSidebarNav() {
  const pathname = usePathname();
  const [isAddExpenseOpen, setAddExpenseOpen] = useState(false);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <Landmark className="size-8 text-primary" />
            <span className="text-xl font-semibold">SpendWise</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="mb-4">
            <Button className="w-full" size="lg" onClick={() => setAddExpenseOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Log Expense
            </Button>
        </div>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="p-2">
      </SidebarFooter>
      <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setAddExpenseOpen} />
    </>
  );
}
