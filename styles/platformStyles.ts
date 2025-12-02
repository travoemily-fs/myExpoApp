import { StyleSheet, Platform, Dimensions } from "react-native";

export const createPlatformStyles = () => {
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
      backgroundColor: "#f5f5f5",

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
      backgroundColor: "white",
      padding: Platform.OS === "web" ? 12 : 16,
      marginBottom: 8,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      ...(Platform.OS === "web" && {
        cursor: "pointer",
        transition: "all 0.2s ease",
      }),
    },

    addButton: {
      backgroundColor: "#007AFF",
      margin: 16,
      padding: Platform.OS === "web" ? 12 : 16,
      borderRadius: 8,
      alignItems: "center",

      ...(Platform.OS === "web" && {
        cursor: "pointer",
      }),
    },

    taskContent: {
      flexGrow: 1,
      flexShrink: 1,
      marginRight: 12,
    },

    taskTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 6,
    },

    completedTask: {
      textDecorationLine: "line-through",
      color: "red",
    },

    taskDescription: {
      fontSize: 14,
      color: "#666",
    },

    taskStatus: {
      fontSize: 24,
      fontWeight: "bold",
    },

    list: {
      flex: 1,
      padding: 14,
    },

    addButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: "red",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      padding: 16,
    },

    emptyState: {
      padding: 24,
      alignItems: "center",
    },

    emptyText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },

    emptySubtext: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
    },

    taskActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    deleteButton: {
      fontSize: 20,
      marginRight: 8,
    },

    taskPriority: {
      marginTop: 4,
      fontSize: 12,
      color: "#444",
    },
  });
};
