import { Button } from "@/components/custom-buttons";
import { CustomInput } from "@/components/custom-input";
import { CustomLabel } from "@/components/custom-label";
import { useTheme } from "@/context/theme-provider";
import { PiMagnifyingGlassBold, PiUserFill } from "react-icons/pi";

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
            <CustomLabel htmlFor="input-1">File</CustomLabel>

            <CustomInput.Root>
              <CustomInput.Input id="input-1" type="file" />
            </CustomInput.Root>
          </div>

          <div className="w-full">
            <CustomLabel htmlFor="input-2">File disabled</CustomLabel>

            <CustomInput.Root>
              <CustomInput.Input id="input-2" disabled type="file" />
            </CustomInput.Root>
          </div>

          <div className="w-full">
            <CustomLabel htmlFor="input-3">Input</CustomLabel>

            <CustomInput.Root>
              <CustomInput.Input id="input-3" placeholder="placeholder..." />
              <CustomInput.Icon Icon={PiMagnifyingGlassBold} />
            </CustomInput.Root>
          </div>

          <div className="w-full">
            <CustomLabel htmlFor="input-4">Input disabled</CustomLabel>

            <CustomInput.Root>
              <CustomInput.Icon Icon={PiUserFill} />
              <CustomInput.Input disabled id="input-4" placeholder="placeholder..." />
            </CustomInput.Root>
          </div>
        </div>

        <table className="table-fixed border-separate border-spacing-3">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Default</th>
              <th>Secondary</th>
              <th>Outline</th>
              <th>Bezel</th>
              <th>Ghost</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td align="left" valign="middle">
                Normal
              </td>
              <td align="center" valign="middle">
                <Button>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"secondary"}>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"outline"}>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"bezel"}>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"ghost"}>Button</Button>
              </td>
            </tr>

            <tr>
              <td align="left" valign="middle">
                Loading
              </td>
              <td align="center" valign="middle">
                <Button isLoading>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"secondary"} isLoading>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"outline"} isLoading>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"bezel"} isLoading>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"ghost"} isLoading>
                  Button
                </Button>
              </td>
            </tr>

            <tr>
              <td align="left" valign="middle">
                Disabled
              </td>
              <td align="center" valign="middle">
                <Button disabled>Button</Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"secondary"} disabled>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"outline"} disabled>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                <Button variant={"bezel"} disabled>
                  Button
                </Button>
              </td>
              <td align="center" valign="middle">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
