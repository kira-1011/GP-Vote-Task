"use client";

import React, { useContext, useEffect, useState } from "react";
import { columns } from "@/components/dashboard/Columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { getTitles, addTitle } from "@/lib/titles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { WalletContext } from "@/context/WalletContext";
import { Loader, WalletIcon } from "lucide-react";
import { ethers } from "ethers";
import { Title } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function DashboardPage() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { connectWallet, address, isConnected } = useContext(WalletContext);

  // Fetch titles on component mount
  useEffect(() => {
    const fetchTitles = async () => {
      setIsLoading(true);
      try {
        const fetchedTitles = await getTitles();
        setTitles(fetchedTitles);
      } catch (error: unknown) {
        console.error("Error fetching titles:", error);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to load titles.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitles();
  }, []);

  // Handle adding a new title
  const onSubmit = async (data: FormSchemaType) => {
    if (!isConnected) {
      toast.error("Please connect your wallet to create a title.");
      return;
    }
    try {
      const newTitle = await addTitle({ title: data.title });
      setTitles((prev) => [newTitle, ...prev]); // Prepend the new title
      toast.success("Title added successfully!");
      reset();
    } catch (error: unknown) {
      console.error("Error adding title:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add title.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-12 space-y-12">
      <h1 className="text-3xl font-bold mb-6 text-center">GP Vote Dashboard</h1>

      <div className="flex items-center space-x-4">
        {isConnected ? (
          <>
            <div className="flex items-center space-x-2">
              <WalletIcon className="h-5 w-5 text-green-500" />
              <p>Connected Wallet: </p>
              <p className="font-bold">
                {address ? ethers.getAddress(address.address) : "No address"}
              </p>
            </div>
          </>
        ) : (
          <Button
            onClick={async () => {
              await connectWallet();
            }}
            className="flex items-center"
          >
            <WalletIcon className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Add Title Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6">
        <Input
          placeholder="Enter new title"
          {...register("title")}
          className="flex-grow mr-2"
          disabled={!isConnected}
        />
        <Button type="submit" disabled={isSubmitting || !isConnected}>
          {isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Title"
          )}
        </Button>
      </form>
      {errors.title && (
        <p className="text-red-500 text-sm mb-4">{errors.title.message}</p>
      )}

      {/* Titles List */}
      {isLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : titles.length === 0 ? (
        <p className="text-center">No titles found. Add a new title above.</p>
      ) : (
        <DataTable columns={columns} data={titles} />
      )}
    </div>
  );
}
