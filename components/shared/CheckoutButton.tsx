"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomSelect from "./CustomSelect";

type ValueChangeProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const CheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const [selectedFootPocketColor, setSelectedFootPocketColor] = useState("");
  const [selectedBladeAngle, setSelectedBladeAngle] = useState("");
  const [selectedSoftness, setSelectedSoftness] = useState("");
  const [selectedBladeSize, setSelectedBladeSize] = useState("");

  const handleColorChange = (color: string) => {
    setSelectedFootPocketColor(color);
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

  return (
    <div className="flex items-center gap-3">
      <>
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
            <div className="flex gap-10 flex-wrap">
              <CustomSelect
                title="Foot Pocket Color"
                selectItem1="Black"
                selectItem2="White"
                handleValueChange={handleColorChange}
              />
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
            </div>

            <div className="mt-10">
              <Checkout
                product={product}
                userId={userId}
                footPocketColor={selectedFootPocketColor}
                bladeAngle={selectedBladeAngle}
                softness={selectedSoftness}
                bladeSize={selectedBladeSize}
              />
            </div>
          </div>
        </SignedIn>
      </>
    </div>
  );
};

export default CheckoutButton;
