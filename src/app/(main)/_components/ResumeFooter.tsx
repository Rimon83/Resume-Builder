import { Button } from "@/components/ui/button";
import { steps } from "@/lib/formSteps";
import { cn } from "@/lib/utils";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showResumePreview: boolean;
  setShowResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

const ResumeFooter = ({
  currentStep,
  setCurrentStep,
  showResumePreview,
  setShowResumePreview,
  isSaving
}: FooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;
  return (
    <footer className="w-full border-t px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowResumePreview(!showResumePreview)}
          className="md:hidden" title={
            showResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>

        <div className="flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className={cn("text-muted-foreground opacity-0", isSaving && "opacity-100")}>Saving...</p>
        </div>
      </div>
    </footer>
  );
};

export default ResumeFooter;
