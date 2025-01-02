import { ResumeValues } from '@/lib/validate'
import React from 'react'
import {formatDate} from "date-fns"

interface Props {
 resumeData: ResumeValues
}

const ResumePreviewExperience = ({resumeData}:Props) => {
 const {workExperiences, colorHex} = resumeData
 const workExperiencesNotEmpty = workExperiences?.filter((exp) => Object.values(exp).filter(Boolean).length > 0)

 if (!workExperiencesNotEmpty?.length) return null
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-4">
        <p className="text-lg font-semibold" style={{color: colorHex}} >WORK EXPERIENCE</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.duties}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResumePreviewExperience