import React, { ReactNode } from "react";

import { StyleSheet, Text, View } from "react-native";

interface FilterOptionsProps {
  label: string;
  children: ReactNode;
  direction?: "column" | "row";
}

export const FilterOptions = ({
  label,
  children,
  direction = "column",
}: FilterOptionsProps) => {
  return (
    <View style={styles.filterOptions}>
      <Text style={styles.textLabel}>{label}</Text>
      <View style={[{ flexDirection: direction }, styles.itemContainer]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
  },
  filterOptions: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    gap: 10,
    paddingBottom: 16,
  },
  itemContainer: {
    gap: 8,
    flexWrap: "wrap",
  },
});
