import { ILayout, ILayoutConfig } from "../types";
import { simpleLayout } from "./simpleLayout";
import { starterLayout } from "./starterLayout";

/**
 * All layouts that are available in the UI
 */
export const layouts: ILayout[] = [simpleLayout, starterLayout];

export const getDefaultLayout = (layout: ILayout): ILayoutConfig => {
  const config: ILayoutConfig = {};

  for (const p of layout.properties) {
    if (p.default != null) {
      config[p.name] = p.default;
    }
  }

  return config;
};

export const getLayoutConfigFromQuery = (
  layoutName: string,
  query: Record<string, string | string[]>,
): ILayoutConfig => {
  const layout = layouts.find(l => l.name === layoutName);

  if (layout == null) {
    return {};
  }

  const config: ILayoutConfig = getDefaultLayout(layout);
  for (const p of layout.properties) {
    if (query[p.name] != null) {
      config[p.name] = query[p.name];
    }
  }

  return config;
};