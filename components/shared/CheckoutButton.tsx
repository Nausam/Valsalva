"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

import state from "@/store";
import CustomSelect from "./CustomSelect";
import { useSnapshot } from "valtio";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { customFormSchema } from "@/lib/customValidator";
import CustomCheckout from "./CustomCheckout";
import { toast } from "../ui/use-toast";

const CheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const [selectedFootPocketColor, setSelectedFootPocketColor] = useState("");
  const [selectedBladeAngle, setSelectedBladeAngle] = useState("");
  const [selectedSoftness, setSelectedSoftness] = useState("");
  const [selectedBladeSize, setSelectedBladeSize] = useState("");
  const [selectedBladeCut, setSelectedBladeCut] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const { startUpload } = useUploadThing("imageUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof customFormSchema>>({
    resolver: zodResolver(customFormSchema),
  });

  async function onSubmit(values: z.infer<typeof customFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
      setImageUrl(uploadedImageUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Please go ahead with the checkout",
      });
    }
  }

  const colorMap: {
    [key: string]: string;
    Black: string;
    White: string;
  } = {
    Black: "#353535",
    White: "#A9A9A9",
  };

  const handleColorChange = (color: string) => {
    setSelectedFootPocketColor(color);
    state.footPocketColor = colorMap[color];
  };

  const handleBladeAngleChange = (angle: string) => {
    setSelectedBladeAngle(angle);
  };

  const handleSoftnessChange = (softness: string) => {
    setSelectedSoftness(softness);
  };

  const handleBladeSizeChange = (size: string) => {
    setSelectedBladeSize(size);
  };

  const handleBladeCutChange = (cut: string) => {
    setSelectedBladeCut(cut);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <SignedOut>
          <Button
            asChild
            size="lg"
            className="button bg-black dark:text-black dark:bg-white border-black border sm:w-fit hover:bg-transparent hover:text-black hover:border-black dark:hover:bg-transparent dark:border-white dark:hover:text-white shadow-lg transition-all duration-300"
          >
            <Link href="/sign-in">Buy</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col gap-5">
            {window.location.pathname ===
              "/product/65e9d07d684eaf43ce92ee67/custom" && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="h-72 w-full">
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

                  <div className="flex gap-10 m-2 items-center justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
                    >
                      {form.formState.isSubmitting ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            <div className="flex gap-10 flex-wrap">
              {window.location.pathname !=
                "/product/65e9d07d684eaf43ce92ee67/custom" && (
                <CustomSelect
                  title="Foot Pocket Color"
                  selectItem1="Black"
                  selectItem2="White"
                  handleValueChange={handleColorChange}
                />
              )}
              <CustomSelect
                title="Blade Angle"
                selectItem1="Blade Angle ~ 20°"
                selectItem2="Blade Angle ~ 33°"
                handleValueChange={handleBladeAngleChange}
              />
              <CustomSelect
                title="Softness"
                selectItem1="Extra Soft"
                selectItem2="Medium"
                handleValueChange={handleSoftnessChange}
              />
              <CustomSelect
                title="Blade Size"
                selectItem1="Short | 70cm | 28 inch | 2.3 Feet"
                selectItem2="Standard | 80cm | 32 inch | 2.6 Feet"
                handleValueChange={handleBladeSizeChange}
              />
              <CustomSelect
                title="Blade Cut"
                selectItem1="Round"
                selectItem2="Rectangular"
                handleValueChange={handleBladeCutChange}
              />
            </div>

            <div className="flex mt-10 justify-end">
              <Checkout
                product={product}
                userId={userId}
                footPocketColor={selectedFootPocketColor}
                bladeAngle={selectedBladeAngle}
                softness={selectedSoftness}
                bladeSize={selectedBladeSize}
                bladeCut={selectedBladeCut}
                imageUrl={imageUrl}
              />
            </div>
          </div>
        </SignedIn>
      </div>
    </>
  );
};

export default CheckoutButton;
