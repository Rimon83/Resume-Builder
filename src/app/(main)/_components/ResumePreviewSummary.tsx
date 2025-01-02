import { ResumeValues } from '@/lib/validate';
import React from 'react'

interface Props {
  resumeData: ResumeValues;
}

const ResumePreviewSummary = ({resumeData}: Props) => {
 const { summary, colorHex } = resumeData;
 if (!summary) return null
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-4">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          PROFESSIONAL SUMMARY
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

export default ResumePreviewSummary