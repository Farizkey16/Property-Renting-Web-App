import { PropertyCategory } from "../../prisma/generated/client";

export function parsePropertyCategory(
  value?: string
): PropertyCategory | undefined {
  if (!value) return undefined;

  if (Object.values(PropertyCategory).includes(value as PropertyCategory)) {
    return value as PropertyCategory;
  }

  return undefined;
}
