import { useSubscriptionLevel } from '@/app/providers/SubscriptionProvider';
import { Button } from '@/components/ui/button';
import usePremiumModal from '@/hooks/usePremiumModel';
import { canUseCustomizations } from '@/lib/permission';
import { Circle, Square, Squircle } from 'lucide-react';
import React from 'react'

interface BorderStyleButtonProps {
 borderStyle: string | undefined;
 onChange: (borderStyle: string) => void
}

export const BorderStyles = {
 SQUARE: "square",
 CIRCLE: "circle",
 SQUIRCLE: "Squircle"
}

const borderStyles = Object.values(BorderStyles)
const BorderStyleButton = ({borderStyle, onChange}: BorderStyleButtonProps) => {

 const handleClick = () => {
   if (!canUseCustomizations(subscriptionLevel)) {
     premiumModal.setOpen(true);
     return;
   }

  const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
  const nextIndex = (currentIndex + 1) % borderStyles.length;
  onChange(borderStyles[nextIndex])

 }
 const Icon = borderStyle === "square" ? Square : borderStyle === "circle" ? Circle : Squircle

  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();
  return (
    <Button variant="outline" size="icon" title="Change border style" onClick={handleClick}>
     <Icon className="size-5"/>

    </Button>
  )
}

export default BorderStyleButton