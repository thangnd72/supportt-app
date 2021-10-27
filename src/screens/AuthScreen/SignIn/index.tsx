import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ActionCreators as ContextAction} from 'store/context';
import {ActionCreators as AuthAction} from 'store/authenticate';
import {ApplicationState} from 'store/configureAction';
import {TextInputUI, Layout, Label, Button} from 'components';
import {useFormik} from 'formik';
import {FormStage, Row, Stage} from 'models/form';
import {LoginUser} from 'models/auth';
import {Image} from 'react-native';
import {IconImage, BackgroundImage} from 'assets';
import {sizes, _screen_height, _screen_width} from 'utils/sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useColor, useKeyboard} from 'hooks';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from 'constant';

interface State {
  forms?: FormStage[];
  user: LoginUser;
  validationSchema: any;
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const SignInLayout = (props: UIProps) => {
  const insets = useSafeAreaInsets();
  const color = useColor();
  const [keyboardHeight] = useKeyboard();
  const navigation = useNavigation();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: props.validationSchema,
    initialValues: {...props.user},
    onSubmit: (values: any) => {
      // props.Login(values)
      props.FieldChange('isLoggedIn', true);
    },
  });
  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString();
    }
    return undefined;
  };
  const handleLogin = () => {
    formik.handleSubmit();
  };
  const DisplayForm = () => {
    let form = props.forms?.find(e => e.stage === Stage.LOGIN);

    if (form) {
      return (
        <Layout>
          {form?.rows.map((r: Row, i: number) => (
            <Layout key={i}>
              {r.controls.map((c, index) => (
                <TextInputUI
                  key={index}
                  placeholder={c.placeholder}
                  uistyle={{paddingTop: sizes._15sdp}}
                  type={c.type}
                  keyboardType={c.keyboardType}
                  errorMessage={errorMessage(c.fieldName)}
                  textValue={formik.values[c.fieldName]}
                  icon={
                    c.fieldName === 'email' ? (
                      <Image
                        style={{
                          width: sizes._20sdp,
                          height: sizes._20sdp,
                        }}
                        resizeMode="contain"
                        source={IconImage.email}
                      />
                    ) : (
                      <Image
                        style={{
                          width: sizes._20sdp,
                          height: sizes._20sdp,
                        }}
                        source={IconImage.lock}
                      />
                    )
                  }
                  onChangeText={(text: string) => {
                    formik.setFieldValue(c.fieldName, text);
                  }}
                />
              ))}
            </Layout>
          ))}
        </Layout>
      );
    }
    return <></>;
  };

  return (
    <ImageBackground
      blurRadius={5}
      style={{
        flex: 1,
      }}
      resizeMode="cover"
      source={BackgroundImage.background}>
      <Layout style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          accessible={false}>
          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'flex-end'}}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            enabled={true}>
            <Layout
              color={color?.WHITE_COLOR}
              paddingBottom={insets.bottom}
              style={{
                maxHeight:
                  keyboardHeight > 0
                    ? _screen_height - keyboardHeight
                    : _screen_height,
                borderTopLeftRadius:
                  Platform.OS === 'android' && keyboardHeight > 0
                    ? 0
                    : sizes._30sdp,
                borderTopRightRadius:
                  Platform.OS === 'android' && keyboardHeight > 0
                    ? 0
                    : sizes._30sdp,
              }}>
              <Layout marginHorizontal={sizes._20sdp} paddingTop={sizes._30sdp}>
                <Label
                  h2
                  style={{fontWeight: '600'}}
                  color={color?.DEAFULT_TEXT_COLOR}>
                  Welcome!
                </Label>
                <Label b2 paddingTop={sizes._5sdp} color={color?.GRAY_COLOR}>
                  Sign in to continue
                </Label>
              </Layout>
              {Platform.OS === 'android' ? (
                <ScrollView>
                  <Layout
                    marginHorizontal={sizes._20sdp}
                    paddingVertical={sizes._10sdp}>
                    {DisplayForm()}
                    <Button
                      activeOpacity={0.8}
                      middle
                      centered
                      marginTop={sizes._17sdp}
                      height={sizes._52sdp}
                      borderRadius={sizes._15sdp}
                      color={color?.PRIMARY_COLOR}
                      onPress={handleLogin}>
                      <Label
                        style={{fontWeight: '700'}}
                        size={sizes._16sdp}
                        color={color?.WHITE_COLOR}>
                        Log In
                      </Label>
                    </Button>
                    <Label
                      onPress={() => {}}
                      style={{textAlign: 'center', fontStyle: 'italic'}}
                      padding={sizes._10sdp}
                      marginTop={sizes._10sdp}
                      marginBottom={sizes._20sdp}
                      size={sizes._14sdp}
                      color={color?.GRAY_COLOR}>
                      Forgot password?
                    </Label>
                    <Button
                      activeOpacity={0.8}
                      middle
                      centered
                      height={sizes._52sdp}
                      borderRadius={sizes._15sdp}
                      borderColor={color?.BORDER_COLOR}
                      borderWidth={1}
                      onPress={() => {
                        navigation.navigate(RouteName.SIGN_UP);
                      }}>
                      <Label
                        style={{fontWeight: '700'}}
                        size={sizes._16sdp}
                        color={color?.DEAFULT_TEXT_COLOR}>
                        Sign up
                      </Label>
                    </Button>
                  </Layout>
                </ScrollView>
              ) : (
                <Layout
                  marginHorizontal={sizes._20sdp}
                  paddingVertical={sizes._10sdp}>
                  {DisplayForm()}
                  <Button
                    activeOpacity={0.8}
                    middle
                    centered
                    marginTop={sizes._17sdp}
                    height={sizes._52sdp}
                    borderRadius={sizes._15sdp}
                    color={color?.PRIMARY_COLOR}
                    onPress={handleLogin}>
                    <Label
                      style={{fontWeight: '700'}}
                      size={sizes._16sdp}
                      color={color?.WHITE_COLOR}>
                      Log In
                    </Label>
                  </Button>
                  <Label
                    onPress={() => {}}
                    style={{textAlign: 'center', fontStyle: 'italic'}}
                    padding={sizes._10sdp}
                    marginTop={sizes._10sdp}
                    marginBottom={sizes._20sdp}
                    size={sizes._14sdp}
                    color={color?.GRAY_COLOR}>
                    Forgot password?
                  </Label>
                  <Button
                    activeOpacity={0.8}
                    middle
                    centered
                    height={sizes._52sdp}
                    borderRadius={sizes._15sdp}
                    borderColor={color?.BORDER_COLOR}
                    borderWidth={1}
                    onPress={() => {
                      navigation.navigate(RouteName.SIGN_UP);
                    }}>
                    <Label
                      style={{fontWeight: '700'}}
                      size={sizes._16sdp}
                      color={color?.DEAFULT_TEXT_COLOR}>
                      Sign up
                    </Label>
                  </Button>
                </Layout>
              )}
            </Layout>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Layout>
    </ImageBackground>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  user: state.AuthenticateState.user,
  validationSchema: state.AuthenticateState.validationSchema,
});
const mapDispatchToProps = {
  ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignInLayout as any);
