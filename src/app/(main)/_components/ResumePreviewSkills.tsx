import { Badge } from '@/components/ui/badge'
import { ResumeValues } from '@/lib/validate'
import React from 'react'
import { BorderStyles } from './BorderStyleButton'

interface Props {
 resumeData: ResumeValues
}
const ResumePreviewSkills = ({resumeData}: Props) => {
 const {skills, colorHex, borderStyle} = resumeData
 if (!skills?.length) return null
 
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-4">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          SKILLS
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black text-md py-2 px-4"
              style={{ backgroundColor: colorHex, borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999PX" : "8px" }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}

export default ResumePreviewSkills