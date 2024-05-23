import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ExpandableItem,
  VariantSummaryItem,
} from "../types/components/general";
import MenuItem from "./MenuItem";

type ExpandableMenuProps = {
  rootItem?: ExpandableItem;
  data: ExpandableItem[];
  selectedVariantsSetter;
  revised?: boolean;
};

const ExpandableMenu = ({
  rootItem,
  data,
  selectedVariantsSetter,
  revised = false,
}: ExpandableMenuProps) => {
  //=============================================
  // 1. State to manage the menu data
  //=============================================
  const [myData, setMyData] = useState(data);

  //=============================================
  // 2. Helper Functions For Complex & Cross Component State Management
  //=============================================
  function toggleCheckbox(id: number) {
    const updatedData = myData.map((element) => {
      if (element.ID === id) {
        return {
          ...element,
          isSelected: !element.isSelected,
        };
      }
      return element;
    });
    setMyData(updatedData);
  }

  function recordVariant(item: ExpandableItem) {
    console.log("<><><><>>>>>>>>>>>", item, rootItem);
    switch (item.type) {
      case "Variant":
        selectVariant(item, rootItem, selectedVariantsSetter);
        break;
      default:
        // collapse all options if parent selected - expand/show all options if parent unselected
        setMyData((prev) => {
          const updatedData = prev.map((element) => {
            if (element.ID === item.ID) {
              return {
                ...element,
                isExpanded: !element.isSelected,
              };
            } else return element;
          });
          return updatedData;
        });

        selectedVariantsSetter(
          (prev: { [key: string]: VariantSummaryItem }) => {
            // remove all individual child variants - regardless of whether or not main item is selected/deselected
            let childDeselected = false;
            const newVariantState = {};
            // ignore all key/values from prev where item.ID is in the key
            for (const key in prev) {
              if (!key.includes(`${item.ID}`)) {
                newVariantState[key] = prev[key];
              } else if (!prev[key].isCategory) {
                childDeselected = true;
              }
            }
            // if already exists and previous existence was not due to a (variant) child, then main item needs to be removed (is deselected)
            if (!childDeselected && prev[`${item.ID}-${item.type}`]) {
              return newVariantState;
            }
            //else add main item
            newVariantState[`${item.ID}-${item.type}`] = {
              parent: item.title,
              variants: item.children?.map((child) => child.title),
              isCategory: true,
            };
            return newVariantState;
          }
        );
        break;
    }
  }

  //=============================================
  // 3. Simpler / Local State Management
  //=============================================
  const handleCheckbox = (item: ExpandableItem) => {
    toggleCheckbox(item.ID);
    recordVariant(item);
  };

  const handleExpansion = (id: number) => {
    const updatedData = myData.map((element) => {
      if (
        element.isExpanded != undefined &&
        element.ID === id &&
        !(element.type != "Variant" && element.isSelected) &&
        element.children?.length
      ) {
        return {
          ...element,
          isExpanded: !element.isExpanded,
        };
      }
      return element;
    });
    setMyData(updatedData);
  };

  //=============================================
  // 4. TSX For UI
  //=============================================
  return (
    <FlatList
      style={styles.menu}
      data={myData}
      keyExtractor={(item: any) => item.ID}
      renderItem={({ item }) => (
        <MenuItem
          item={item}
          toggleSelection={handleCheckbox}
          toggleExpansion={handleExpansion}
          variantRecorder={selectedVariantsSetter}
        />
      )}
      nestedScrollEnabled={true}
      persistentScrollbar={true}
    />
  );
};

export default ExpandableMenu;

const styles = StyleSheet.create({
  menu: {
    paddingStart: 20,
  },
});

function selectVariant(
  item: ExpandableItem,
  rootItem: ExpandableItem,
  selectedVariantsSetter: any
) {
  selectedVariantsSetter(
    (prev: {
      [key: string]: VariantSummaryItem;
    }): { [key: string]: VariantSummaryItem } => {
      const key = `${item.parentID}-${rootItem.type}`;

      // if item does not exist, add to selected variants
      if (!prev[key]) {
        return {
          ...prev,
          [key]: {
            parent: rootItem.title,
            variants: [item.title],
            isCategory: false,
          },
        };
      }
      // else if key exists i.e. variant of same model selected/deselected - either remove it or add it accordingly
      const filteredVariants = prev[key].variants?.filter(
        (element) => element !== item.title
      ); // in deselect case
      return {
        ...prev,
        [key]: {
          isCategory: !(item.type == "Variant"),
          parent: rootItem.title,
          variants: prev[key].variants?.includes(item.title)
            ? // if all variants deselected, remove the parent key
              (filteredVariants?.length && filteredVariants) || undefined
            : [...(prev[key].variants || []), item.title],
        },
      };
    }
  );
}
