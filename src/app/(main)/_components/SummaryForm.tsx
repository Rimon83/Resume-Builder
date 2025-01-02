import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/lib/type";
import { summarySchema, SummaryValues } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

const SummaryForm = ({ resumeData, setResumeData }: FormData) => {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: { summary: resumeData.summary || "" },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <section className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <p className="text-sm text-muted-foreground">
          {" "}
          A brief overview of your experience and skills r let AI generate a
          summary for you.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write a brief summary of your experience and skills"
                  />
                </FormControl>
                <FormMessage />
                <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </section>
  );
};

export default SummaryForm;
