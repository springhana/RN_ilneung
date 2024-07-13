import {StyleSheet, View, SafeAreaView, Text, Dimensions} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import InputField from '../../components/common/InputField';
import useForm from '../../hooks/useForm';
import {validateSearch} from '../../utils';
import {colors} from '../../constants/colors';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';
import useUserInfoStorage from '@/hooks/storage/useUserInfoStorage';

const deviceHeight = Dimensions.get('window').height;

export default function CustomDraweContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const search = useForm({
    initialValue: {title: ''},
    validate: validateSearch,
  });
  const {name, introduce} = useUserInfoStorage();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          {/* <View style={styles.userImageContainer}>
            <Image
              source={require('@/assets/user-default.png')}
              style={styles.userImage}
            />
          </View> */}
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View>
          <InputField
            placeholder={introduce}
            error={search.errors.title}
            touched={search.touched.title}
            inputMode="text"
            blurOnSubmit={false}
            disabled
            {...search.getTextInputProps('title')}
          />
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    contentContainer: {
      padding: deviceHeight > 700 ? 10 : 5,
      height: Dimensions.get('window').height,
      backgroundColor: colors[theme].WHITE,
    },
    userInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 15,
      marginLeft: 10,
    },
    // userImageContainer: {
    //   width: 70,
    //   height: 70,
    //   borderRadius: 35,
    // },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    nameText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    container: {
      flex: 1,
    },
  });
