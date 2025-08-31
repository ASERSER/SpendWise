
"use client";

import { useEffect, useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import {
  budgets as initialBudgets,
  categories as allCategories,
} from "@/lib/data";
import type { Budget } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const getBudgetColor = (percentage: number) => {
  if (percentage > 100) return "bg-destructive";
  if (percentage > 80) return "bg-yellow-500";
  return "bg-primary";
};

const getCategoryName = (scope: string) => {
  if (scope === "overall") return "Overall Budget";
  const category = allCategories.find((c) => c.id === scope);
  return category?.name || "Budget";
};

export function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [editForm, setEditForm] = useState({ name: "", amount: "" });
  const [addForm, setAddForm] = useState({ scope: "", amount: "" });
  const [daysInMonth, setDaysInMonth] = useState(30);

  useEffect(() => {
      const date = new Date();
      setDaysInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
  }, []);


  // Edit and Delete handlers
  const handleEditClick = (budget: Budget) => {
    setSelectedBudget(budget);
    setEditForm({
      name: getCategoryName(budget.scope),
      amount: String(budget.amount),
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (budget: Budget) => {
    setSelectedBudget(budget);
    setDeleteDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedBudget) return;
    setBudgets(
      budgets.map((b) =>
        b.id === selectedBudget.id
          ? { ...b, amount: parseFloat(editForm.amount) || 0 }
          : b
      )
    );
    setEditDialogOpen(false);
    setSelectedBudget(null);
  };

  const handleDeleteConfirm = () => {
    if (!selectedBudget) return;
    setBudgets(budgets.filter((b) => b.id !== selectedBudget.id));
    setDeleteDialogOpen(false);
    setSelectedBudget(null);
  };

  // Add handlers
  const handleAddBudget = () => {
    const newBudget: Budget = {
      id: `bud_${Date.now()}`,
      scope: addForm.scope,
      name: getCategoryName(addForm.scope),
      amount: parseFloat(addForm.amount) || 0,
      spent: 0,
      period: "monthly",
    };
    setBudgets([...budgets, newBudget]);
    setAddDialogOpen(false);
    setAddForm({ scope: "", amount: "" });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          const dailyBudget = budget.amount / daysInMonth;

          return (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {budget.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(budget)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(budget)}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(budget.amount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(budget.spent)} spent
                </p>
                <Progress
                  value={percentage}
                  indicatorClassName={getBudgetColor(percentage)}
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {formatCurrency(budget.amount - budget.spent)} remaining
                  </span>
                  <span>{formatCurrency(dailyBudget)}/day</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
              <Card
                className="flex cursor-pointer items-center justify-center border-dashed hover:border-primary hover:bg-muted"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Plus className="h-8 w-8" />
                    <span className="font-medium">Add New Budget</span>
                  </div>
                </CardContent>
              </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Budget</DialogTitle>
              <DialogDescription>
                Create a new budget for a category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={addForm.scope}
                  onValueChange={(value) =>
                    setAddForm({ ...addForm, scope: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={addForm.amount}
                  onChange={(e) =>
                    setAddForm({ ...addForm, amount: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBudget}>Add Budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Budget Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              Update the amount for your {editForm.name} budget.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              budget.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
