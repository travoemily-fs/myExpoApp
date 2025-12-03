import { StyleSheet, Platform, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";



export const createPlatformStyles = (colors: Theme["colors"]) => {

  let responsiveContainer = {};
  let responsiveColumns = {};

  if (Platform.OS === "web") {
    const { width } = Dimensions.get("window");

    if (width > 768) {
      responsiveContainer = { padding: 24, maxWidth: 1200 };
      responsiveColumns = { flexDirection: "row", flexWrap: "wrap" };
    } else {
      responsiveContainer = { padding: 16 };
      responsiveColumns = { flexDirection: "column" };
    }
  }

  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      ...(Platform.OS === "web" && {
        maxWidth: 800,
        alignSelf: "center",
        width: "100%",
      }),
      ...responsiveContainer,
    },

    columns: {
      flex: 1,
      ...responsiveColumns,
    },

    taskItem: {
      backgroundColor: colors.card,
      padding: Platform.OS === "web" ? 16 : 20,
      marginBottom: 12,
      marginHorizontal: 8,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...(Platform.OS === "web" && {
        cursor: "pointer",
        transition: "all 0.2s ease",
      }),
    },

      taskContent: {
      flexGrow: 1,
      flexShrink: 1,
      marginRight: 12,
    },

    addButton: {
      backgroundColor: "#007AFF",
      margin: 20,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      ...(Platform.OS === "web" && { cursor: "pointer" }),
    },

    taskTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 6,
    },

    completedTask: {
      textDecorationLine: "line-through",
      opacity: 0.6,
    },

    taskDescription: {
      fontSize: 15,
      color: colors.text,
      opacity: 0.8,
      marginBottom: 4,
    },

    taskPriority: {
      fontSize: 13,
      color: colors.text,
      opacity: 0.7,
    },

    taskStatus: {
      fontSize: 28,
    },

    list: {
      flex: 1,
      paddingHorizontal: 8,
    },

    addButtonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "600",
    },

    centered: {
      justifyContent: "center",
      alignItems: "center",
    },

    errorText: {
      color: "red",
      fontSize: 16,
      textAlign: "center",
      padding: 16,
    },

    emptyState: {
      padding: 40,
      alignItems: "center",
    },

    emptyText: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },

    emptySubtext: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      textAlign: "center",
    },

    taskActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    deleteButton: {
      fontSize: 22,
    },
  });
};