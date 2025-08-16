import { ExternalLink } from '@/components/ExternalLink';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-black px-6 pt-14">
      <Text className="text-white text-3xl font-bold">Settings</Text>
      <Text className="text-white/60 mt-1">Configure your app</Text>

      <View className="mt-8 bg-white/5 rounded-2xl p-5 border border-white/10">
        <Text className="text-white font-semibold mb-2">Supabase</Text>
        <Text className="text-white/70">
          Add your Supabase URL and anon key to a `.env` file in the project root using the
          keys `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
        </Text>
        <ExternalLink className="mt-3" href="https://supabase.com/">
          <Text className="text-brand-400">Open Supabase dashboard</Text>
        </ExternalLink>
      </View>
    </View>
  );
}
