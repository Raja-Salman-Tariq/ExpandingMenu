import { VariantSummaryItem } from "../types/components/general";

//=============================================
// Simple Util Function
//=============================================
function getSelectionSummary(item: VariantSummaryItem) {
  if (item.isCategory) {
    return `all ${item.parent} devices`;
  }
  if (!item.variants?.length) {
    return undefined;
  }
  return `${item.parent} ${item.variants.join(", ")}`;
}

export default getSelectionSummary;
