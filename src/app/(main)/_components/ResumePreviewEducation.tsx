import { ResumeValues } from '@/lib/validate'
import React from 'react'
import {formatDate} from "date-fns"

interface Props {
 resumeData: ResumeValues
}

const ResumePreviewEducation = ({resumeData}:Props) => {
 const {education, colorHex} = resumeData
 const educationNotEmpty = education?.filter((edu) => Object.values(edu).filter(Boolean).length > 0)

 if (!educationNotEmpty?.length) return null
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-4">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          EDUCATION
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold">
              {edu.fieldOfStudy && edu.degree ? (
                <span>
                  {edu.degree.charAt(0).toUpperCase() + edu.degree.slice(1)} IN{" "}
                  {edu.fieldOfStudy.charAt(0).toUpperCase() +
                    edu.fieldOfStudy.slice(1)}
                </span>
              ) : (
                <span>
                  {edu.degree &&
                    edu.degree.charAt(0).toUpperCase() + edu.degree.slice(1)}
                </span>
              )}

              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResumePreviewEducation