import NetworkScreen from '@/features/network/screens/NetworkScreen';
import { View } from 'react-native';

export default function NetworkTab() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <NetworkScreen />
    </View>
  );
}