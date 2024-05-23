//=============================================
// Type For Expandable & Selectable Items
//=============================================
export type ExpandableItem = {
  ID: number;
  title: string;
  children?: ExpandableItem[];
  isSelected: boolean;
  isExpanded?: boolean;
  parentID?: number;
  qty?: number;
  type: "Product" | "Brand" | "Variant" | "Model";
};

//=============================================
//Type For "Selected Variants" Summary Chips
//=============================================
export type VariantSummaryItem = {
  parent: string;
  variants: string[];
  isCategory: boolean;
};
