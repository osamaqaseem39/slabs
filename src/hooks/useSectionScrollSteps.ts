import { useEffect } from "react";

export type SectionScrollDirection = "forward" | "backward";
export type SectionScrollHandler = (direction: SectionScrollDirection) => boolean;

const sectionScrollHandlers = new Map<string, SectionScrollHandler>();

export const getSectionScrollHandler = (sectionId: string) =>
  sectionScrollHandlers.get(sectionId) ?? null;

export function useSectionScrollSteps(
  sectionId: string,
  handler: SectionScrollHandler | null | undefined
) {
  useEffect(() => {
    if (!handler) {
      sectionScrollHandlers.delete(sectionId);
      return undefined;
    }

    sectionScrollHandlers.set(sectionId, handler);

    return () => {
      const existing = sectionScrollHandlers.get(sectionId);
      if (existing === handler) {
        sectionScrollHandlers.delete(sectionId);
      }
    };
  }, [sectionId, handler]);
}

export default useSectionScrollSteps;

