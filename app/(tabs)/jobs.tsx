import JobsScreen from '@/features/jobs/screens/JobScreen';
import { View } from 'react-native';
export default function JobsTab() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <JobsScreen />
    </View>
  );
}