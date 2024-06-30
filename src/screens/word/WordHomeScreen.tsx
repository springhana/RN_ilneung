import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../constants/colors';
import {ThemeMode} from '../../types';
import useThemeStore from '../../store/useThemeStore';
import {WORDBOOK} from '../../utils';
import CustomIcon from '../../components/common/CustomIcon';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {WordStackParamList} from '../../navigation/stack/WordStackNavigator';
import {MainDrawerParamList} from '../../navigation/drawer/MainDrawerNavigator';
import {wordNavigations} from '../../constants/navigators';
import {numbers} from '@/constants/numbers';

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<WordStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const deviceHeight = Dimensions.get('window').height;

export default function WordHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const WordBooks = WORDBOOK(theme);
  const navigation = useNavigation<Navigation>();

  const handlePressBook = (source: string, index: number) => {
    if (index === 0) {
      navigation.navigate(wordNavigations.WORD_FAVORITES);
      return;
    }
    navigation.navigate(wordNavigations.WORD_STEP, {source});
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        {WordBooks.map((book, index) => (
          <View key={book.source} style={styles.bookContainer}>
            <Pressable
              style={[styles.book, {backgroundColor: book.color}]}
              onPress={() => handlePressBook(book.source, index)}>
              <View style={styles.icon}>
                <CustomIcon color={book.color} />
              </View>
              <Text style={styles.text}>{book.title}</Text>
            </Pressable>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}
const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: deviceHeight,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: colors[theme].BLUE_200,
      padding: deviceHeight > 700 ? 10 : 5,
    },
    bookContainer: {
      position: 'relative',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 10,
    },
    book: {
      width: 130,
      height: 160,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    icon: {
      marginTop: 4,
      marginLeft: 4,
    },
    text: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      fontSize: 28,
      color: colors['light'].WHITE,
      fontWeight: 'bold',
      margin: 4,
    },
  });
