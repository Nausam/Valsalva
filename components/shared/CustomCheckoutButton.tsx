"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

import state from "@/store";
import CustomSelect from "./CustomSelect";

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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { customFormSchema } from "@/lib/customValidator";
import { toast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import CustomCheckout from "./CustomCheckout";
import Card from "../ui/card";
import CardContent from "../ui/cardContent";
import Image from "next/image";

const CustomCheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const pathname = usePathname();

  const [selectedFootPocketColor, setSelectedFootPocketColor] = useState("");
  const [selectedBladeAngle, setSelectedBladeAngle] = useState("");
  const [selectedSoftness, setSelectedSoftness] = useState("");
  const [selectedBladeSize, setSelectedBladeSize] = useState("");
  const [selectedBladeCut, setSelectedBladeCut] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    setFormSubmitted(true);
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
            {pathname === "/product/65e9d07d684eaf43ce92ee67/custom" && (
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
              {pathname != "/product/65e9d07d684eaf43ce92ee67/custom" && (
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

            {/* <Carousel>
              <CarouselContent>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <Image
                    src="/assets/images/cut.png"
                    height={100}
                    width={100}
                    alt="blade cut image"
                    className="rounded-sm"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel> */}

            <div className="flex mt-10 justify-end">
              <CustomCheckout
                product={product}
                userId={userId}
                footPocketColor={selectedFootPocketColor}
                bladeAngle={selectedBladeAngle}
                softness={selectedSoftness}
                bladeSize={selectedBladeSize}
                bladeCut={selectedBladeCut}
                imageUrl={imageUrl}
                disabled={!formSubmitted}
              />
            </div>
          </div>
        </SignedIn>
      </div>
    </>
  );
};

export default CustomCheckoutButton;

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
