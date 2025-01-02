import React from 'react'
import Navbar from './_components/Navbar'
import { auth } from '@clerk/nextjs/server';
import { getUserSubscriptionLevel } from '@/lib/subscription';
import SubscriptionLevelProvider from '../providers/SubscriptionProvider';

const LayoutMain = async ({children}:{children:React.ReactNode}) => {
   const { userId } = await auth();

   if (!userId) {
     return null;
   }

   const userSubscriptionLevel = await getUserSubscriptionLevel(userId);
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </main>
    </SubscriptionLevelProvider>
  );
}

export default LayoutMain