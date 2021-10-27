import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ActionCreators as ContextAction} from 'store/context';
import {ActionCreators as AuthAction} from 'store/authenticate';
import {ApplicationState} from 'store/configureAction';
import {TextInputUI, Layout, Label, Button} from 'components';
import {useFormik} from 'formik';
import {FormStage, Row, Stage} from 'models/form';
import {Register} from 'models/auth';
import {Image} from 'react-native';
import {BackgroundImage, IconImage} from 'assets';
import {sizes, _screen_height, _screen_width} from 'utils/sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useColor, useKeyboard} from 'hooks';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Platform} from 'react-native';

interface State {
  forms?: FormStage[];
  register: Register;
  validationSignUpSchema: any;
}
type UIProps = State & typeof ContextAction & typeof AuthAction;

const SignUpLayout = (props: UIProps) => {
  const insets = useSafeAreaInsets();
  const color = useColor();
  const [keyboardHeight] = useKeyboard();

  const navigation = useNavigation();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: props.validationSignUpSchema,
    initialValues: {...props.register},
    onSubmit: (values: any) => {},
  });
  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString();
    }
    return undefined;
  };
  const handleSignup = () => {
    formik.handleSubmit();
  };

  const displayIcon = (fieldName: string) => {
    if (fieldName === 'firstName')
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: color?.DEAFULT_TEXT_COLOR,
          }}
          source={IconImage.user}
        />
      );
    if (fieldName === 'lastName')
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: color?.DEAFULT_TEXT_COLOR,
          }}
          source={IconImage.user}
        />
      );
    if (fieldName === 'email')
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: color?.DEAFULT_TEXT_COLOR,
          }}
          source={IconImage.email}
        />
      );
    if (fieldName === 'password')
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: color?.DEAFULT_TEXT_COLOR,
          }}
          source={IconImage.lock}
        />
      );
    if (fieldName === 'repeatPassword')
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: color?.DEAFULT_TEXT_COLOR,
          }}
          source={IconImage.lock}
        />
      );
  };
  const DisplayForm = () => {
    let form = props.forms?.find(e => e.stage === Stage.SIGNUP);

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
                  icon={displayIcon(c.fieldName)}
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
      blurRadius={15}
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
                borderTopLeftRadius: keyboardHeight > 0 ? 0 : sizes._30sdp,
                borderTopRightRadius: keyboardHeight > 0 ? 0 : sizes._30sdp,
              }}>
              <Layout
                style={{
                  borderBottomLeftRadius: sizes._30sdp,
                  borderBottomRightRadius: sizes._30sdp,
                }}
                paddingBottom={sizes._10sdp}
                paddingTop={
                  keyboardHeight > 0 ? sizes._60sdp + insets.top : sizes._30sdp
                }>
                <Label
                  h2
                  marginHorizontal={sizes._20sdp}
                  style={{fontWeight: '600'}}
                  color={color?.DEAFULT_TEXT_COLOR}>
                  Create an account
                </Label>
                <Label
                  b2
                  paddingTop={sizes._5sdp}
                  marginHorizontal={sizes._20sdp}
                  color={color?.GRAY_COLOR}>
                  Start you career with us
                </Label>
              </Layout>
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
                    onPress={handleSignup}>
                    <Label
                      style={{fontWeight: '700'}}
                      size={sizes._16sdp}
                      color={'white'}>
                      Sign up
                    </Label>
                  </Button>
                </Layout>
                <Layout horizontal marginTop={sizes._20sdp}>
                  <Label
                    onPress={() => {}}
                    style={{textAlign: 'center', fontStyle: 'italic'}}
                    padding={sizes._10sdp}
                    marginTop={sizes._10sdp}
                    marginBottom={sizes._20sdp}
                    size={sizes._14sdp}
                    paddingHorizontal={sizes._20sdp}
                    color={color?.GRAY_COLOR}>
                    Already have an account?
                  </Label>
                  <Button
                    activeOpacity={0.8}
                    middle
                    centered
                    height={sizes._52sdp}
                    borderRadius={sizes._15sdp}
                    borderColor={color?.BORDER_COLOR}
                    borderWidth={1}
                    paddingHorizontal={sizes._52sdp}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Label
                      style={{fontWeight: '700'}}
                      size={sizes._16sdp}
                      color={color?.DEAFULT_TEXT_COLOR}>
                      Login
                    </Label>
                  </Button>
                </Layout>
              </ScrollView>
            </Layout>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Layout>
    </ImageBackground>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  forms: state.AuthenticateState.forms,
  register: state.AuthenticateState.register,
  validationSignUpSchema: state.AuthenticateState.validationSignUpSchema,
});
const mapDispatchToProps = {
  ...AuthAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignUpLayout as any);
