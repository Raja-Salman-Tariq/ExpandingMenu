import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ExpandableItem,
  VariantSummaryItem,
} from "../types/components/general";
import mockData from "../utils/mockData";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import ExpandableMenu from "../components/ExpandableMenu";
import VariantsDisplay from "../components/VariantsDisplay";
import { Link } from "expo-router";

export default function App() {
  //=============================================
  // Cross component state management
  //=============================================
  // here we record all selections by immediate parent's ID
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: VariantSummaryItem;
  }>({});

  //=============================================
  // Simple JSX Utilizing Custom Components
  //=============================================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Productsss</Text>
      <View style={styles.productsView}>
        <ExpandableMenu
          rootItem={undefined}
          data={mockData}
          selectedVariantsSetter={setSelectedVariants}
        />
      </View>
      <View style={styles.summarySection}>
        <Text style={styles.summaryText}>Selected Variants</Text>
        <VariantsDisplay data={selectedVariants} />
      </View>
    </View>
  );
}

//=============================================
// Styling
//=============================================
const styles = StyleSheet.create({
  // make sure the items within the container are vertically conjusted and dont have white space between them
  container: {
    height: "80%",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  productsView: {
    height: "75%",
    backgroundColor: "lightgrey",
    borderWidth: 1.5,
    borderColor: "blue",
  },
  summarySection: {
    width: "95%",
  },
  summaryText: {
    fontSize: 18,
    marginTop: 30,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "23%",
    height: "50%",
    alignContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
