import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="wrapper w-full my-20 items-center flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold text-gray-800 dark:text-white">FAQ</h2>
      <Accordion type="single" collapsible>
        <AccordionItem
          className="sm:w-[600px] md:w-[700px] w-[330px]"
          value="item-1"
        >
          <AccordionTrigger>Who are we?</AccordionTrigger>
          <AccordionContent>
            Valsalva is a premium destination for customizable snorkel fins
            tailored to meet your exact preferences and needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Where are we located?</AccordionTrigger>
          <AccordionContent>
            We are located in the sunny side of life, Maldives
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do we ship worldwide?</AccordionTrigger>
          <AccordionContent>
            No. At the moment we only ship to Asia.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
