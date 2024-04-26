"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productFormSchema, profileFormSchema } from "@/lib/validator";
import { userDefaultValues } from "@/constants";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "../ui/use-toast";
import { IUser } from "@/lib/database/models/user.model";
import { updateUserProfile } from "@/lib/actions/user.actions";

type ProductFormProps = {
  userId: string;
  user?: IUser;
};

const ProfileForm = ({ userId, user }: ProductFormProps) => {
  const initialValues = userDefaultValues;

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!userId) {
      router.back();
      return;
    }
    try {
      const updatedUser = await updateUserProfile({
        userId,
        user: {
          ...values,
          address: "",
          phoneNumber: "",
        },
        path: "/profile",
      });
      if (updatedUser) {
        form.reset();
        router.push(`/profile/${updatedUser._id}`);
        toast({
          title: "Profile updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error updating profile",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter Adress"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter Phone Number"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
