"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SkillsInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const skills = value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const add = () => {
    const combined = [...skills];
    for (const skill of draft
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)) {
      if (!combined.some((item) => item.toLowerCase() === skill.toLowerCase()))
        combined.push(skill);
    }
    onChange(combined.join(", "));
    setDraft("");
  };
  return (
    <div className="space-y-3 sm:col-span-2">
      <label htmlFor="skills" className="text-sm font-medium text-[#004242]">
        Skills
      </label>
      <div className="flex gap-2">
        <Input
          id="skills"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={add}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              add();
            }
          }}
          placeholder="e.g. Product Management"
          aria-describedby="skills-help"
          className="h-11"
        />
        <Button
          type="button"
          onClick={add}
          className="h-11 bg-[#004242] hover:bg-[#053535]"
          aria-label="Add skill"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      <p id="skills-help" className="text-xs text-gray-500">
        Type a skill and press Enter or Add. You can also paste multiple skills
        separated by commas.
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#edf5f2] px-3 py-1.5 text-xs font-medium text-[#004242]"
          >
            {skill}
            <button
              type="button"
              aria-label={`Remove skill ${skill}`}
              onClick={() =>
                onChange(
                  skills.filter((_, position) => position !== index).join(", "),
                )
              }
              className="rounded-full p-1 hover:bg-[#004242]/10"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
