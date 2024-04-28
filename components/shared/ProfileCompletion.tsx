"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getUserById, updateProfile } from "@/lib/actions/user.actions";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { profileFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ProfileCompletion = ({ clerkId, userId }: any) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      country: "",
      city: "",
      street: "",
      zipCode: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getUserById(userId);
        form.reset({
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          zipCode: data.address.zipCode,
          phoneNumber: data.address.phoneNumber,
        });
      } catch (error) {
        toast({
          title: "NO DATA FOUND",
          description: "Please update your profile data.",
        });
      }
    };

    if (clerkId) {
      loadProfileData();
    }
  }, [clerkId, form]);

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const user = {
      address: {
        ...values,
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
        phoneNumber: values.phoneNumber,
      },
    };

    try {
      const response = await updateProfile(clerkId, user);
      if (response) {
        form.reset(values);
        window.location.href = "/profile";
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Failed to update your profile. Please try again. 
        ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="mt-20 w-full">
        <h3 className="h3-bold flex md:justify-start justify-center">
          Complete Your Profile
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Country"
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
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
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Zip Code"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Street"
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
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
              className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg mt-10"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileCompletion;
