"use client"

import * as React from "react" // 1. Import React
import { type ColumnDef } from "@tanstack/react-table"
import { Loader2, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { type Entry } from "@/types"
import { EntryForm } from "./EntryForm"
import { useDeleteEntry } from "@/hooks/use-entries"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatCurrencyShorthand } from "@/lib/helper"

// 2. Add an 'onClose' prop
function DeleteConfirmation({ trigger, id }: { trigger: React.ReactNode; id: number }) {
  const deleteMutation = useDeleteEntry();

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Entry deleted successfully!");
      },
      onError: (err: unknown) => {
        console.error(err);
        toast.error("Failed to delete entry. Please try again.");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this entry from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("type") === "TV_SHOW" ? "TV Show" : "Movie"}
      </div>
    ),
  },
  {
    accessorKey: "director",
    header: "Director",
    cell: ({ row }) => row.getValue("director") || "N/A",
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => formatCurrencyShorthand(row.getValue("budget")),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.getValue("location") || "N/A",
  },
  {
    accessorKey: "duration",
    header: "Duration (min)",
    cell: ({ row }) => row.getValue("duration") || "N/A",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const entry = row.original;

      return (
        // 4. This is the new layout for the actions cell
        <div className="flex items-center justify-end gap-2">
          {/* Edit Button */}
          <EntryForm
            initialData={entry}
            trigger={
              <Button variant="outline" size="sm" className="h-8">
                <Edit className="size-4" />
              </Button>
            }
          />

          {/* Delete Button */}
          <DeleteConfirmation
            id={entry.id}
            trigger={
              <Button variant="destructive" size="sm" className="h-8 bg-red-500">
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      );
    },
  }
]