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
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/lib/validator";
import { productDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/database/models/product.model";

import { Switch } from "@/components/ui/switch";
import { toast } from "../ui/use-toast";

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
};

const ProductForm = ({
  userId,
  type,
  product,
  productId,
}: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [productCounter, setProductCounter] = useState(0);

  const initialValues =
    product && type === "Update" ? product : productDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
    }

    // Increment productCounter
    const paddedCounter = productCounter.toString().padStart(2, "0");
    const newProductId = `Item[${paddedCounter}]`;
    setProductCounter((prevCounter) => prevCounter + 1);

    if (type === "Create") {
      try {
        const newProduct = await createProduct({
          product: {
            ...values,
            imageUrl: uploadedImageUrl,
            productId: newProductId,
          },
          userId,
          path: "/profile",
        });
        if (newProduct) {
          form.reset();
          router.push(`/product/${newProduct._id}`);
        }
        toast({
          title: `${values.title} created successfully`,
        });
      } catch (error) {
        toast({
          title: `Error creating ${values.title}`,
          variant: "destructive",
        });
      }
    }

    if (type === "Update") {
      if (!productId) {
        router.back();
        return;
      }

      try {
        const updatedProduct = await updateProduct({
          userId,
          product: { ...values, imageUrl: uploadedImageUrl, _id: productId },
          path: `/product/${productId}}`,
        });
        if (updatedProduct) {
          form.reset();
          router.push(`/product/${updatedProduct._id}`);
        }
        toast({
          title: `${values.title} updated successfully`,
        });
      } catch (error) {
        toast({
          title: `Error updating ${values.title}`,
          variant: "destructive",
        });
      }
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Product title"
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full dark:bg-[#191919] rounded-full text-black">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
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
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm bg-grey-50 dark:bg-[#191919] px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 dark:bg-[#191919] outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="footPocketColor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Foot Pocket Color"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-sm bg-grey-50 dark:bg-[#191919]  p-3 shadow-sm max-w-sm">
              <div className="space-y-0.5">
                <FormLabel>Is product available?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Product `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
