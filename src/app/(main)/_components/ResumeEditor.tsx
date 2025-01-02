"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "@/lib/formSteps";
import BreadCrumbs from "./BreadCrumbs";
import ResumeFooter from "./ResumeFooter";
import { ResumeValues } from "@/lib/validate";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useAutoSaving from "@/hooks/useAutoSave";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/type";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null
}
const ResumeEditor = ({resumeToEdit}: ResumeEditorProps) => {
  const [resumeData, setResumeData] = useState<ResumeValues>(resumeToEdit ? mapToResumeValues(resumeToEdit) : {});
  const [showResumePreview, setShowResumePreview] = useState(false)
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const {isSaving, hasUnsavedChanges} = useAutoSaving(resumeData)
  useUnloadWarning(hasUnsavedChanges)

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <section className="flex min-h-[calc(100vh-78px)] flex-col">
      <header className="space-y-2 border-b px-4 py-8 text-center">
        <h1 className="text-2xl font-bold"> Create your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Create a professional resume by following these steps
        </p>
      </header>

      <main className="relative flex-grow">
        <div className="absolute bottom-0 top-0 flex h-full w-full">
          <div className={cn("w-full space-y-8 overflow-y-auto p-4 md:w-1/2 md:block", showResumePreview && "hidden")}>
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showResumePreview && "flex")}
          />
        </div>
      </main>

      <ResumeFooter currentStep={currentStep} setCurrentStep={setStep} showResumePreview={showResumePreview} setShowResumePreview={setShowResumePreview} isSaving={isSaving}/>
    </section>
  );
};

export default ResumeEditor;
