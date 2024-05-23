import React from "react";
import { ExpandableItem } from "../types/components/general";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import ExpandableMenu from "./ExpandableMenu";
import { roundToNearestMultiple } from "../utils/numberUtils";
import { getSummary } from "../utils/menuUtils";

type MenuItemProps = {
  item: ExpandableItem;
  toggleSelection?: (ExpandableItem) => void;
  toggleExpansion?: (number) => void;
  variantRecorder?: (ExpandableItem) => void;
  revised?: boolean;
};

const MenuItem = ({
  item,
  toggleSelection,
  toggleExpansion,
  variantRecorder,
  revised = false,
}: MenuItemProps) => {
  //=============================================
  // Simple TSX & Prop / Handlers Passing
  //=============================================
  return (
    <View style={revised ? styles.containerRevised : styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Checkbox
          style={styles.checkbox}
          value={item.isSelected}
          onValueChange={() => toggleSelection(item)}
        />
        <Text
          style={styles.title}
          onPress={() => item.children?.length && toggleExpansion(item.ID)}
        >
          {item.title}
        </Text>
      </View>
      {!item.isExpanded && (
        <Text style={styles.optionsSummary}>{getSummary(item)}</Text>
      )}
      {item.isExpanded && (
        <ExpandableMenu
          rootItem={item}
          data={item.children}
          selectedVariantsSetter={variantRecorder}
          revised={revised}
        />
      )}
    </View>
  );
};

//=============================================
// Styling
//=============================================
const styles = StyleSheet.create({
  containerRevised: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingStart: 10,
    paddingTop: 5,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingStart: 10,
    paddingTop: 5,
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
  },
  optionsSummary: {
    fontSize: 12,
    paddingStart: 25,
  },
});

export default MenuItem;
