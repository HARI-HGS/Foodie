import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds

const data = [
  { id: '1', image: require('../assets/images/shop1.jpg') },
  { id: '2', image: require('../assets/images/shop1.jpg') },
  { id: '3', image: require('../assets/images/shop1.jpg') },
  { id: '4', image: require('../assets/images/shop1.jpg') },

 
];

const AutoSlidingView = () => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= data.length) {
          flatListRef.current.scrollToIndex({ index: 0, animated: true });
          return 0;
        } else {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        }
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotSize = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index.toString()}
              style={[styles.dot, { width: dotSize, height: dotSize, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    backgroundColor: '#595959',
    borderRadius: 8,
    marginHorizontal: 4,
  },
});

export default AutoSlidingView;
