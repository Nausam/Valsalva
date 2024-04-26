import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="wrapper w-full my-20 items-center flex flex-col gap-8 md:mt-32 mt-10">
      <h2 className="h2-bold text-gray-800 dark:text-white">FAQ</h2>
      <Accordion type="single" collapsible>
        <AccordionItem
          className="sm:w-[600px] lg:w-[1000px] md:w-[700px] w-[330px]"
          value="item-1"
        >
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            Who are we?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            Valsalva is a premium destination for customizable snorkel fins
            tailored to meet your exact preferences and needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            Where are we located?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            We are located in the sunny side of life, Maldives
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            Do we ship worldwide?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            No. At the moment we only ship to Asia.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
