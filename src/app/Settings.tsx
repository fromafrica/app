import { Text, View, Pressable, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
    const { bottom } = useSafeAreaInsets();
    return (
      <View
        className="flex shrink-0 bg-gray-100"
        style={{ paddingBottom: bottom }}
      >
        <View className="py-6 flex-1 items-start px-4 md:px-6 ">
          <Text className={"text-center text-gray-700"}>
            settings
          </Text>
        </View>
      </View>
    );
  }