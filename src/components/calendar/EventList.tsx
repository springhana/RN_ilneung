import {StyleSheet, ScrollView, View, Pressable, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {colors} from '@/constants/colors';

interface EventListProps {
  posts: {address: string; title: string}[];
}

const EventList = ({posts}: EventListProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{right: 1}}>
      <View style={[styles.innerContainer, {marginBottom: insets.bottom + 30}]}>
        {posts?.map((post, index) => (
          <Pressable key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader} />
            <View style={styles.infoContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
    },
    innerContainer: {
      gap: 20,
    },
    itemContainer: {
      flexDirection: 'row',
    },
    itemHeader: {
      backgroundColor: colors[theme].PINK_300,
      width: 6,
      height: 50,
      marginRight: 8,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-evenly',
    },
    addressText: {
      color: colors[theme].GRAY_200,
      fontSize: 13,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default EventList;
