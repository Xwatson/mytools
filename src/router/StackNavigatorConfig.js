import { Easing, Animated } from "react-native";

const StackNavigationConfig = {
    initialRouteName: 'BottomTab',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    headerLayoutPreset: 'center',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const width = layout.initWidth;
        // 左右切换
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, -(width - 10)],
        });
        // 上下切换
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });
        // 透明度
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
        // return { opacity, transform: [{ translateY }] };
      },
    }),
}

export default StackNavigationConfig;