import { useEffect, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Text, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { Plus, Check, Trash2, CheckCircle2, Circle } from 'lucide-react-native';
import { getTasks, createTask, deleteTask as apiDeleteTask, setTaskComplete, type Task } from '@/lib/api';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function addTask() {
    if (!newTitle.trim()) return;
    setLoading(true);
    await createTask(newTitle.trim());
    setNewTitle('');
    setLoading(false);
    fetchTasks();
  }

  async function toggleTask(task: Task) {
    await setTaskComplete(task.id, !task.is_complete);
    fetchTasks();
  }

  async function deleteTask(task: Task) {
    await apiDeleteTask(task.id);
    fetchTasks();
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Section */}
      <View className="px-6 pt-4 pb-6 bg-white border-b border-gray-200">
        <View className="mb-6">
          <Text className="text-gray-900 text-4xl font-bold tracking-tight">Tasks</Text>
          <Text className="text-gray-600 text-base mt-2 font-medium">Stay organized and productive</Text>
        </View>
        
        {/* Add Task Input */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4">
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="What needs to be done?"
              placeholderTextColor="#9ca3af"
              className="text-gray-900 text-base font-medium"
              returnKeyType="done"
              onSubmitEditing={addTask}
              multiline={false}
            />
          </View>
          <TouchableOpacity
            className={`rounded-2xl p-4 shadow-lg ${
              loading ? 'bg-gray-400' : 'bg-brand-500 active:bg-brand-600'
            }`}
            onPress={addTask}
            disabled={loading || !newTitle.trim()}
          >
            {loading ? (
              <ActivityIndicator color="white" size={20} />
            ) : (
              <Plus color="white" size={20} strokeWidth={2.5} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Tasks List */}
      <FlatList
        contentContainerStyle={{ 
          padding: 24, 
          paddingBottom: 100,
          flexGrow: 1
        }}
        data={tasks}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
            <View className="flex-row items-start gap-4">
              <TouchableOpacity
                className={`mt-1 ${
                  item.is_complete ? 'opacity-100' : 'opacity-70'
                }`}
                onPress={() => toggleTask(item)}
              >
                {item.is_complete ? (
                  <CheckCircle2 color="#10b981" size={24} strokeWidth={2} />
                ) : (
                  <Circle color="#9ca3af" size={24} strokeWidth={2} />
                )}
              </TouchableOpacity>
              
              <View className="flex-1">
                <Text className={`text-base font-medium leading-6 ${
                  item.is_complete 
                    ? 'line-through text-gray-400' 
                    : 'text-gray-900'
                }`}>
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm mt-2 font-medium">
                  {new Date(item.inserted_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </View>
              
              <TouchableOpacity 
                className="p-2 -mr-2 rounded-xl active:bg-gray-100" 
                onPress={() => deleteTask(item)}
              >
                <Trash2 color="#ef4444" size={20} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center flex-1 px-8">
            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-6">
                <CheckCircle2 color="#9ca3af" size={32} strokeWidth={1.5} />
              </View>
              <Text className="text-gray-900 text-xl font-semibold mb-2">No tasks yet</Text>
              <Text className="text-gray-500 text-center text-base leading-6">
                Add your first task above to get started with your productivity journey
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
