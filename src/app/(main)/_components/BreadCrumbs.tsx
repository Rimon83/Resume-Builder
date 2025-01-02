import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "@/lib/formSteps";
import React from "react";

interface BreadCrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const BreadCrumbs = ({ currentStep, setCurrentStep }: BreadCrumbsProps) => {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps &&
            steps.map((step) => (
              <React.Fragment key={step.key}>
                <BreadcrumbItem>
                  {step.key === currentStep ? (
                    <BreadcrumbPage>{step.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                     <button onClick={() => setCurrentStep(step.key)} >
                      {step.title}
                     </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="last:hidden" />
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
