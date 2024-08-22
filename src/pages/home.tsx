import { ElevatedButton, OutlinedButton } from "@/components/custom-buttons";
import { Input } from "@/components/custom-input";
import { CustomPageMetadata } from "@/components/custom-page-metadata";
import { useTheme } from "@/context/theme-provider";

export function Home() {
  const { toggleTheme } = useTheme();

  return (
    <main className="flex items-center justify-center flex-col min-h-screen bg-custom-neutral-950 text-custom-neutral-50">
      {/* Change title in index.html */}
      <CustomPageMetadata.Root title="Boilerplate">
        {CustomPageMetadata.Robots({ forceNoIndex: true })}
        {CustomPageMetadata.Description({ description: "Custom description" })}
      </CustomPageMetadata.Root>

      <h1 className="text-4xl pt-10">Home</h1>
      <div className="flex items-center justify-center gap-2 flex-1">
        <div className="flex items-center justify-center gap-2 flex-1 flex-col">
          <Input type="file" />
          <Input type="file" disabled />
          <Input type="text" placeholder="placeholder..." />
          <Input type="text" placeholder="placeholder..." disabled />
        </div>

        <div className="flex items-center justify-center gap-2 flex-1 flex-col">
          <ElevatedButton>Button</ElevatedButton>
          <ElevatedButton isLoading>Button</ElevatedButton>
          <OutlinedButton>Button</OutlinedButton>
          <OutlinedButton isLoading>Button</OutlinedButton>
        </div>

        <div className="flex items-center justify-center flex-col">
          <div>Theme</div>

          <div className="grid grid-cols-2 gap-2">
            <ElevatedButton onClick={() => toggleTheme("light")}>Light</ElevatedButton>
            <ElevatedButton onClick={() => toggleTheme("dark")}>Dark</ElevatedButton>
          </div>
        </div>
      </div>
    </main>
  );
}
