import { Button } from "@/components/custom-buttons";
import { Input } from "@/components/custom-input";
import { useTheme } from "@/context/theme-provider";
import { Label } from "@radix-ui/react-label";
import { PiCaretRightBold } from "react-icons/pi";

export function Home() {
  const { toggleTheme } = useTheme();

  return (
    <main className="flex items-center justify-center flex-col min-h-screen">
      <title>Home | Vite Boilerplate</title>
      <meta name="description" content="Custom description for this page. New feature of React v19." />

      <h1 className="text-4xl font-bold mb-10">Home</h1>

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center flex-col">
          <div>Theme</div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => toggleTheme("light")}>Light</Button>
            <Button onClick={() => toggleTheme("dark")}>Dark</Button>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <div className="w-full">
            <Label htmlFor="file1">File input</Label>
            <Input type="file" id="file1" />
          </div>

          <div className="w-full">
            <Label htmlFor="file2">File input disabled</Label>
            <Input type="file" disabled id="file2" />
          </div>

          <div className="w-full">
            <Label htmlFor="file3">File text disabled</Label>
            <Input type="text" placeholder="placeholder..." id="file3" />
          </div>

          <div className="w-full">
            <Label htmlFor="file4">File text disabled</Label>
            <Input type="text" placeholder="placeholder..." disabled id="file4" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col gap-2">
            <Button>Button</Button>
            <Button isLoading>Button</Button>
            <Button disabled>Button</Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant={"secondary"}>Button</Button>
            <Button variant={"secondary"} isLoading>
              Button
            </Button>
            <Button variant={"secondary"} disabled>
              Button
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant={"outline"}>Button</Button>
            <Button variant={"outline"} isLoading>
              Button
            </Button>
            <Button variant={"outline"} disabled>
              Button
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant={"bezel"}>Button</Button>
            <Button variant={"bezel"} isLoading>
              Button
            </Button>
            <Button variant={"bezel"} disabled>
              Button
            </Button>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <Button variant={"default"} size={"icon"}>
              <PiCaretRightBold />
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <PiCaretRightBold />
            </Button>{" "}
            <Button variant={"ghost"} size={"icon"}>
              <PiCaretRightBold />
            </Button>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <Button variant={"link"}>Button</Button>
            <Button variant={"ghost"}>Button</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
