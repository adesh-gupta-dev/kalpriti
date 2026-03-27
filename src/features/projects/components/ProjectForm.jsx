import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import {
  projectCreateSchema,
  projectEditSchema,
} from "../../../utils/validationSchemas";
import { useTheme } from "../../../contexts/ThemeContext";
// UI Style Arrays
const modernVisualStyles = [
  "Glassmorphism",
  "Neumorphism",
  "Skeuomorphism",
  "Flat Design",
  "Material Design",
  "Fluent Design",
];

const depthStyles = [
  "Claymorphism",
  "3D UI Design",
  "Floating UI",
  "Layered UI",
];

const transparencyStyles = ["Frosted Glass UI", "Acrylic UI", "Blur UI"];

const colorStyles = [
  "Gradient UI",
  "Duotone UI",
  "Monochrome UI",
  "Vibrant UI",
];

const layoutStyles = [
  "Card-based UI",
  "Split-screen UI",
  "Grid UI",
  "Dashboard UI",
];

const interactionStyles = ["Microinteraction UI", "Motion UI", "Parallax UI"];

const themeStyles = [
  "Dark Mode UI",
  "Light Mode UI",
  "Cyberpunk UI",
  "Minimalist UI",
];

const modernTrendStyles = [
  "AI Generated UI",
  "Bento Grid UI",
  "Aurora UI",
  "Mesh Gradient UI",
];

// Combine all styles
const uiStyles = [
  ...modernVisualStyles,
  ...depthStyles,
  ...transparencyStyles,
  ...colorStyles,
  ...layoutStyles,
  ...interactionStyles,
  ...themeStyles,
  ...modernTrendStyles,
];

// Generate AI prompts for each UI style
const uiPrompts = Object.fromEntries(
  uiStyles.map((style) => [
    style,
    `Use ${style} design style with modern layout, responsive components, smooth spacing, clean typography, and professional UI.`,
  ]),
);

export function ProjectForm({
  mode = "create",
  initialValues,
  onSubmit,
  loading = false,
  submitLabel,
}) {
  const schema = mode === "create" ? projectCreateSchema : projectEditSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      websiteName: initialValues?.websiteName || "",
      initialPrompt: initialValues?.initialPrompt || "",
      uiStyle: "",
      prompt: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        websiteName: initialValues.websiteName || "",
        initialPrompt: initialValues.initialPrompt || "",
        uiStyle: "",
        prompt: "",
      });
    }
  }, [initialValues, reset]);

  // Handle submit with AI prompt enhancement
  const selectedUiStyle = watch("uiStyle");

  const handleFormSubmit = (data) => {
    if (mode === "create") {
      const stylePrompt = uiPrompts[selectedUiStyle] || "";
      const finalPrompt = stylePrompt
        ? `${data.initialPrompt}. ${stylePrompt}`
        : data.initialPrompt;

      onSubmit({
        ...data,
        initialPrompt: finalPrompt,
      });
      return;
    }

    onSubmit(data);
  };
  const { theme } = useTheme();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        label="Website Name"
        placeholder="Kalpriti Landing"
        error={errors.websiteName?.message}
        {...register("websiteName")}
      />

      {mode === "create" ? (
        <>
          <Textarea
            label="Initial Prompt"
            placeholder="Build a modern SaaS landing page with hero, features, and pricing"
            error={errors.initialPrompt?.message}
            {...register("initialPrompt")}
          />

          {/* UI Style Selector */}
          <div className="space-y-1">
            <label className="text-sm font-medium">UI Style</label>
            <select
              className="w-full border rounded-md px-3 py-2 bg-transparent"
              {...register("uiStyle")}
            >
              <option
                value=""
                className={
                  theme === "dark"
                    ? "bg-sky-900 text-amber-100"
                    : "bg-orange-100"
                }
              >
                Select UI Style
              </option>

              {uiStyles.map((style) => (
                <option
                  key={style}
                  value={style}
                  className={
                    theme === "dark"
                      ? "bg-sky-900 text-amber-100"
                      : "bg-orange-100"
                  }
                >
                  {style}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <Textarea
          label="Optional AI Update Prompt"
          placeholder="Example: Make it cleaner, add testimonials and dark mode support"
          error={errors.prompt?.message}
          {...register("prompt")}
        />
      )}

      <Button type="submit" loading={loading}>
        {submitLabel || (mode === "create" ? "Create Project" : "Save Changes")}
      </Button>
    </form>
  );
}
