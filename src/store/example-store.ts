import { create } from "zustand";

type ExampleStoreProps = {
  status: any | undefined;
  setStatus: (status: any) => void;
};

export const useExampleStore = create<ExampleStoreProps>(set => {
  return {
    status: undefined,
    setStatus: status => set(() => ({ status }))
  };
});
