"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Title } from "@/types";
import { deleteTitle } from "@/lib/titles";

export const columns: ColumnDef<Title>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <span>{`${title}`}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return <span>{createdAt.toLocaleString()}</span>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await deleteTitle(row.original.uuid);
              }}
              className="text-red-500"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Title
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
