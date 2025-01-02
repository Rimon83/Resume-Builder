"use client"
import { useSubscriptionLevel } from "@/app/providers/SubscriptionProvider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import usePremiumModal from "@/hooks/usePremiumModel";
import { canUseCustomizations } from "@/lib/permission";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume color"
          onClick={() => {
            if (!canUseCustomizations(subscriptionLevel)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
        >
          <PaletteIcon className="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
