import { create } from "zustand";
import { useShallow } from "zustand/shallow";

type ExampleStoreProps = {
  status: any | undefined;
  setStatus: (status: any) => void;
};

const useStore = create<ExampleStoreProps>(set => {
  return {
    status: undefined,
    setStatus: status => set(() => ({ status }))
  };
});

export const useExampleStore = <T>(selector: (state: ExampleStoreProps) => T): T => {
  return useStore(useShallow(selector));
};
