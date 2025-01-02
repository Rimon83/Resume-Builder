import PersonalForm from "@/app/(main)/_components/PersonalForm";
import StartForm from "@/app/(main)/_components/StartForm";
import { FormData } from "./type";
import WorkExperienceForm from "@/app/(main)/_components/WorkExperienceForm";
import EducationForm from "@/app/(main)/_components/EducationForm";
import SkillsForm from "@/app/(main)/_components/SkillsForm";
import SummaryForm from "@/app/(main)/_components/SummaryForm";

type Steps = {
  title: string;
  component: React.ComponentType<FormData>;
  key: string;
};
export const steps: Steps[] = [
  { title: "General info", component: StartForm, key: "general-info" },
  { title: "Personal info", component: PersonalForm, key: "personal-info" },
  {
    title: "work Experiences",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skill" },
  { title: "Summary", component: SummaryForm, key: "summary" },
];
