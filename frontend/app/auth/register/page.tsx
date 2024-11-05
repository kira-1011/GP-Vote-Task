// app/register/page.tsx

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/form";
import { Form } from "@/components/common/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/common/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ErrorResponse, RegisterRequest } from "@/types";
import { register as registerUser } from "@/lib/auth";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .nonempty({ message: "Email is required." }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type FormSchemaType = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();

  // Initialize the form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler
  async function onSubmit(values: FormSchemaType) {
    try {
      // Prepare the registration data
      const registrationData: RegisterRequest = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      // Use the register API utility
      await registerUser(registrationData);

      toast.success("Registered successfully!");

      router.push("/");
    } catch (error: unknown) {
      // Handle errors
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message || "Registration failed.";
        const detailedMessages = axiosError.response?.data?.messages;

        console.error(
          "Registration error:",
          axiosError.response?.data || error.message
        );

        if (detailedMessages && detailedMessages.length > 0) {
          toast.error(detailedMessages.join(" "));
        } else {
          toast.error(errorMessage);
        }
      } else {
        // Handle non-Axios errors
        console.error("Registration error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center tracking-wide">
            GP VOTE
          </h1>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Registering
              </>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
