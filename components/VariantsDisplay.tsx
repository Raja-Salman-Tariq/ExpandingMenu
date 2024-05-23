import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { VariantSummaryItem } from "../types/components/general";
import getSelectionSummary from "../utils/variantUtils";

type VariantsDisplayProps = {
  data: { [parentID: string]: VariantSummaryItem };
};

//=============================================
// Simple Rendering of Selected Variants
//=============================================
const VariantsDisplay = ({ data }: VariantsDisplayProps) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.summaryItemView}
        data={Object.keys(data).map((key) => data[key])}
        renderItem={({ item }) => {
          const selectionSummary = getSelectionSummary(item);
          if (selectionSummary) {
            return (
              <Text ellipsizeMode={"tail"} style={styles.summaryItem}>
                {selectionSummary}
              </Text>
            );
          }
          return null;
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        scrollEnabled={true}
      />
    </View>
  );
};

export default VariantsDisplay;

//=============================================
// Styling
//=============================================
const styles = StyleSheet.create({
  summaryItem: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 5,
    marginHorizontal: 15,
    maxWidth: "80%",
  },
  summaryItemView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
