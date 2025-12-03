import PlatformAwareCard from "@/components/PlatformAwareCard";
import ThemedView from "@/components/ThemedView";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTasks } from "@/hooks/useTasks";
import { useToggleTheme } from "@/hooks/useToggleTheme";
import type { Task } from "@/services/storage";
import { createPlatformStyles } from "@/styles/platformStyles";
import { useTheme } from "@react-navigation/native";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const { dark, colors } = useTheme();
  const styles = createPlatformStyles(colors);

  const { tasks, loading, error, deleteTask, updateTask, refreshTasks } =
    useTasks();

  const breakpoint = useBreakpoint();
  const toggleTheme = useToggleTheme();

  const getNumColumns = () => {
    switch (breakpoint) {
      case "xl":
        return 3;
      case "lg":
        return 2;
      default:
        return 1;
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshTasks();
    }, [refreshTasks])
  );

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch {
      Alert.alert("Error", "Failed to update task");
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (Platform.OS === "web") {
      const ok = window.confirm("Delete this task?");
      if (!ok) return;
      try {
        await deleteTask(id);
      } catch {
        alert("Failed to delete task");
      }
      return;
    }
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
          } catch {
            Alert.alert("Error", "Failed to delete task");
          }
        },
      },
    ]);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={[
        styles.taskItem,
        getNumColumns() > 1 ? { flex: 1, marginHorizontal: 6 } : null,
      ]}>
      <PlatformAwareCard>
        <TouchableOpacity
          style={styles.taskContent}
          onPress={() => handleToggleComplete(item.id!, item.completed)}>
          <Text
            style={[styles.taskTitle, item.completed && styles.completedTask]}>
            {item.title}
          </Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
        </TouchableOpacity>

        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id!)}>
            <Text style={styles.deleteButton}>🗑️</Text>
          </TouchableOpacity>
          <Text style={styles.taskStatus}>{item.completed ? "✅" : "⭕"}</Text>
        </View>
      </PlatformAwareCard>
    </View>
  );

  if (loading) {
    return (
      <ThemedView>
        <View style={[styles.container, styles.centered]}>
          <Text>Loading tasks...</Text>
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 10,
          }}>
          <Text style={{ fontSize: 24, fontWeight: "600", color: colors.text }}>
            Tasks
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text style={{ color: colors.text, fontSize: 16 }}>Dark mode</Text>
            <Switch value={dark} onValueChange={toggleTheme} />
          </View>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id?.toString() || ""}
          numColumns={getNumColumns()}
          key={getNumColumns()}
          columnWrapperStyle={getNumColumns() > 1 ? { gap: 12 } : undefined}
          style={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No tasks yet!</Text>
              <Text style={styles.emptySubtext}>
                Create your first task to get started.
              </Text>
            </View>
          }
        />

        <Link href="/add-task" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ThemedView>
  );
}
