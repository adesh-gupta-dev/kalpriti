import { Search } from "lucide-react";
import { Input } from "../../../components/ui/Input";

export function ProjectFilters({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
}) {
  return (
    <div className="grid gap-3 rounded-2xl border  border-ink/10 bg-panel/60 p-4 md:grid-cols-[1fr_220px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-8 h-4 w-4 text-muted" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-9 mt-5"
          placeholder="Search projects by name"
          aria-label="Search projects"
        />
      </div>
      <label className="space-y-1.5 text-sm text-ink">
        Visibility
        <select
          className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-primary dark:bg-panel"
          value={visibility}
          onChange={(event) => onVisibilityChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="private">Private</option>
        </select>
      </label>
    </div>
  );
}
