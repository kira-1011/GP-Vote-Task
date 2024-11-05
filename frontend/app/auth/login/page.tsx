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
import { ErrorResponse, LoginRequest, LoginResponse } from "@/types";
import { login } from "@/lib/auth";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();

  // Initialize the form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  async function onSubmit(values: FormSchemaType) {
    try {
      // Use the login API utility
      const response: LoginResponse = await login(values as LoginRequest);

      // Save JWT token to localStorage
      localStorage.setItem("token", response.token);

      toast.success("Logged in successfully!");

      // Redirect to dashboard
      router.push("/");
    } catch (error: unknown) {
      // Handle errors
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message || "Login failed.";
        const detailedMessages = axiosError.response?.data?.messages;

        console.error(
          "Login error:",
          axiosError.response?.data || error.message
        );

        if (detailedMessages && detailedMessages.length > 0) {
          toast.error(detailedMessages.join(" "));
        } else {
          // Use general error message
          toast.error(errorMessage);
        }
      } else {
        // Handle non-Axios errors
        console.error("Login error:", error);
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

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Logging in
              </>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
