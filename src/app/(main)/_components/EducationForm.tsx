import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/lib/type";
import { educationSchema, EducationValues } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

const EducationForm = ({ resumeData, setResumeData }: FormData) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  };

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        education: values.education?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <section className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your education history
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <EducationItem
                  key={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                  id={field.id}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  school: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default EducationForm;

interface educationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}

export const EducationItem = ({
  form,
  index,
  remove,
  id,
}: educationItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className={cn(
        "space-y-4 rounded-md border bg-background p-4",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex justify-between gap-4">
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal
          className="size-6 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`education.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>

            <FormControl>
              <Input {...field} placeholder="School" autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`education.${index}.degree`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Degree" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`education.${index}.fieldOfStudy`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Of Study</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Field" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  placeholder="Start Date"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  placeholder="End Date"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        Leave <span className="font-semibold">End Date</span> empty if you are
        currently working here
      </FormDescription>
      {/* <FormField
        control={form.control}
        name={`workExperiences.${index}.duties`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duties</FormLabel>

            <FormControl>
              <Textarea {...field} placeholder="Duties" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
