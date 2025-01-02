import React from 'react'
import ResumeEditor from '../_components/ResumeEditor'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { resumeDataInclude } from '@/lib/type'

interface PageProps {
  searchParams: Promise<{resumeId? : string}>
}
export const metadata = {
 title: "Build Resume"
}
const EditorPage = async ({searchParams}: PageProps) => {
  const {resumeId} = await searchParams
  const {userId} = await auth()

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;


  return (
    <div>
     <ResumeEditor resumeToEdit={resumeToEdit} />

    </div>
  )
}

export default EditorPage