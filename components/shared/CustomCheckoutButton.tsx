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
import { cuts } from "@/utils/data";

const CustomCheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const pathname = usePathname();

  const [selectedFootPocketColor, setSelectedFootPocketColor] = useState("");
  const [selectedBladeAngle, setSelectedBladeAngle] = useState("");
  const [selectedSoftness, setSelectedSoftness] = useState("");
  const [selectedBladeSize, setSelectedBladeSize] = useState("");
  const [selectedBladeCut, setSelectedBladeCut] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const userId = user?.publicMetadata.userId as string;

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
        title: "Design uploaded successfully",
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

  const isAnySelectEmpty =
    !selectedFootPocketColor ||
    !selectedBladeAngle ||
    !selectedSoftness ||
    !selectedBladeSize ||
    !selectedBladeCut;

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

            <div className="flex justify-start gap-10 flex-wrap">
              <CustomSelect
                title="Foot Pocket"
                selectItems={["Black", "White"]}
                handleValueChange={handleColorChange}
              />

              <CustomSelect
                title="Blade Angle"
                selectItems={[
                  "Blade Angle ~ 15°",
                  "Blade Angle ~ 26°",
                  "Blade Angle ~ 29°",
                  "Blade Angle ~ 30°",
                ]}
                handleValueChange={handleBladeAngleChange}
              />
              <CustomSelect
                title="Hardness"
                selectItems={["Soft", "Medium", "Hard"]}
                handleValueChange={handleSoftnessChange}
              />
              <CustomSelect
                title="Blade Size"
                selectItems={[
                  "35-36 cm",
                  "37-38 cm",
                  "39-40 cm",
                  "41-42 cm",
                  "43-44 cm",
                  "45-46 cm",
                ]}
                handleValueChange={handleBladeSizeChange}
              />
              <CustomSelect
                title="Blade Cut"
                selectItems={[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                ]}
                handleValueChange={handleBladeCutChange}
              />

              <Carousel>
                <CarouselContent>
                  {cuts.map((cut) => (
                    <CarouselItem key={cut.id} className="basis-1/3">
                      <Image
                        src={cut.imageUrl}
                        height={100}
                        width={100}
                        alt="blade cut image"
                        className="rounded-sm dark:invert-0 invert"
                        loading="lazy"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="flex mt-10 md:justify-start justify-end">
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
                isAnySelectEmpty={isAnySelectEmpty}
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
