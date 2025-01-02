import prisma from '@/lib/prisma';
import { resumeDataInclude } from '@/lib/type';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import ResumeItem from './_components/ResumeItem';
import CreateResumeButton from './_components/CreateResumeButton';
import { getUserSubscriptionLevel } from '@/lib/subscription';
import { canCreateResume } from '@/lib/permission';

export const metadata = {
  title: "Your resume",
};


const ResumePage = async () => {
   const { userId } = await auth();

   if (!userId) {
     return null;
   }

   const [resumes, totalCount, subscriptionLevel] = await Promise.all([
     prisma.resume.findMany({
       where: {
         userId,
       },
       orderBy: {
         updatedAt: "desc",
       },
       include: resumeDataInclude,
     }),
     prisma.resume.count({
       where: {
         userId,
       },
     }),
     getUserSubscriptionLevel(userId)
   ]);
  return (
    <section className="mx-auto w-full max-w-7xl space-x-8 px-4 py-8">
      {/* <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New request
        </Link>
      </Button> */}
      <CreateResumeButton
        canCreate={canCreateResume(subscriptionLevel, totalCount)}
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </section>
  );
}

export default ResumePage