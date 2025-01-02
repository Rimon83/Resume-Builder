import useDimensions from '@/hooks/useDimensions';
import { cn } from '@/lib/utils';
import { ResumeValues } from '@/lib/validate'
import React, { useRef } from 'react'
import ResumePreviewPersonal from './ResumePreviewPersonal';
import ResumePreviewSummary from './ResumePreviewSummary';
import ResumePreviewExperience from './ResumePreviewExperience';
import ResumePreviewEducation from './ResumePreviewEducation';
import ResumePreviewSkills from './ResumePreviewSkills';
interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}
const ResumePreview = ({
  resumeData,
  contentRef, className,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "mx-2 my-4 aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <ResumePreviewPersonal resumeData={resumeData} />
        <ResumePreviewSummary resumeData={resumeData} />
        <ResumePreviewExperience resumeData={resumeData} />
        <ResumePreviewEducation resumeData={resumeData} />
        <ResumePreviewSkills resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview