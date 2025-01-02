import { ResumeValues } from "@/lib/validate";
import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "./use-toast";
import { saveResume } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaving(resumeData: ResumeValues) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isError, setIsError] = useState(false);

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);


  useEffect(() => {
    async function save() {
      // setIsSaving(true);
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // setLastSavedData(structuredClone(debouncedResumeData));
      // setIsSaving(false);

      try {
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(debouncedResumeData);
        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="apace-y-3">
              <p>Could not save changes.</p>
              <Button
              variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    // console.log(
    //   "debouncedResumeData",
    //   JSON.stringify(debouncedResumeData, fileReplacer),
    // );
    // console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [debouncedResumeData, lastSavedData, isSaving, isError, searchParams, toast, resumeId]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
