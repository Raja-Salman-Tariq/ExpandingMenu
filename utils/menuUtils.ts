import { ExpandableItem } from "../types/components/general";
import { roundToNearestMultiple } from "./numberUtils";

//=============================================
// Main Util Function Used By Other Components
//=============================================
function getSummary(item: ExpandableItem): string {
  let summary = "";

  switch (item.type) {
    case "Product":
      // summary = item.title;
      break;
    case "Brand":
      // summary = item.title;
      break;
    case "Model":
      summary = getVariantsSummary(item);
      break;
    case "Variant":
      const rounded = roundToNearestMultiple(item.qty);
      summary = item.qty
        ? `${rounded}${rounded < item.qty && "+"} devices`
        : "";
      break;
    default:
      break;
  }

  return summary;
}

//=============================================
// Helper Function
//=============================================
// if the item has children, we need to calculate the total quantity of devices
// grouped by each product title
function aggregatedVariantsSummary(items: ExpandableItem[]): {
  [x: string]: number;
} {
  // if children are leaves, then simply aggregate
  return items.reduce((acc, item) => {
    if (acc[item.title]) {
      acc[item.title] += item.qty;
    } else {
      acc[item.title] = item.qty;
    }
    return acc;
  }, {});
}

function getVariantsSummary(item: ExpandableItem): string {
  // if the item has no children, return an empty string as there is nothing to summarize
  if (!item.children?.length) return "";
  // else, summarize all available variants
  const aggregatedCounts = aggregatedVariantsSummary(item.children);
  const summaryArray = Object.keys(aggregatedCounts).map((key) => {
    const rounded = roundToNearestMultiple(aggregatedCounts[key]);
    return `${rounded}${rounded < aggregatedCounts[key] && "+"} ${key}`;
  });
  return summaryArray.join(", ");
}

export { getSummary };
