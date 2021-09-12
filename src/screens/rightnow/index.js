import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import PostCard from '../../components/postcard.js';
import { doGoAddPost } from '../../redux/actions/RightNow';
import { doGrabAllData } from '../../redux/actions/RightNow';

const sendImage = require('../../../assets/comBadge.png');

const RightNow = ({ navigation, uid, school_id, posts, goAddPost }) => {
  const { colors, fonts } = useTheme();
  let variable = null;
  useEffect(() => {
    console.log(
      'The use effect hook renders first, and re-renders upon changed variables'
    );
  }, [variable]); //When object 'variable is modified the useffect hook will fire again
  //NOTE I will not be changing variable but demonstrating the concept behind the react native structure

  //formData willl be used in Textinput
  const [formData, setFormData] = useState({
    counter: 0,
    maxCount: 240,
    content: '',
  });

  //This 'renderItem object will be used in the Flatlist
  //it describes the action and orientation of each item in posts
  const renderItem = ({ item }) => {
    const goNav = () =>
      navigation.navigate('FullViewStack', {
        screen: 'PostFullView',
        params: {
          item: { ...item, sender: { uid: item.sender.uid } },
          myID: uid,
        },
      });
    return (
      <PostCard
        post={item}
        goNav={goNav}
        media={item.media ? item.media : null}
      />
    );
  };

  //Checking if the user has selected a school, if not then we prompt them to do so
  const checkSchool = () => {
    if (!school_id) {
      navigation.push('SchoolStack', {
        screen: 'SetSchool',
        params: {
          origin: 'RightNow',
        },
      });
    }
  };

  //User Interface code
  //THis is meant as a sample to show basic structure and use of react objects
  //as well as some OOP
  return (
    <View
      onTouchStart={checkSchool}
      style={{ flex: 1, backgroundColor: colors.backgroundYellow }}
    >
      <Text
        style={[
          styles.Header,
          {
            fontFamily: fonts.semiBold,
            fontSize: 25,
            color: colors.black,
            letterSpacing: -0.25,
          },
        ]}
      >
        Header!
      </Text>
      {/* GIving an input for someone to type  */}
      <TextInput
        placeholder={'Say something...'}
        maxLength={formData.maxCount}
        multiline={true}
        autoFocus={true}
        style={[
          styles.inputBox,
          {
            fontFamily: fonts.medium,
            fontSize: 18,
            letterSpacing: -0.25,
          },
        ]}
        onBlur={dismissKeyboard}
        onChangeText={(text) =>
          setFormData((prevState) => ({
            ...prevState,

            counter: text.length,
            content: text,
          }))
        }
        value={formData.content}
      />
      {/* This image will be clickable to send post to backend */}
      <TouchableOpacity
        style={styles.pressMe}
        onPress={() => goAddPost(formData, uid)}
      >
        <Image
          source={sendImage}
          style={[
            styles.sendit,
            {
              tintColor: formData.counter > 0 ? colors.primaryGreen : 'black',
            },
          ]}
        />
      </TouchableOpacity>
      {/* Here is a Flatlist to show display posts after the've been made */}
      <FlatList
        data={posts}
        extraData={posts?.length}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={1}
      ></FlatList>
    </View>
  );
};

//propTypes, render before the screen so its useful to ensure data is loaded
RightNow.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  uid: PropTypes.string.isRequired,
  school_id: PropTypes.string,
  posts: PropTypes.array.isRequired,
  goAddPost: PropTypes.func.isRequired,
};

//We want to bring in certain data elements from the state
//These routes are a hypothetical setup of organized data
const mapStateToProps = (state) => ({
  school_id: state.user.user.school_id,
  posts: state.rightnow.posts,
});

//Dispatching functions to api files where the magic happens
const mapDispatchToProps = (dispatch) => ({
  goAddPost: (formData, uid) => dispatch(doGoAddPost(formData, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightNow);

//Style sheet to put UI in correct place
const styles = StyleSheet.create({
  ...Platform.select({
    ios: {
      Header: {
        marginRight: wp('5%'),
        marginTop: hp('3%'),
      },
      inputBox: {
        marginTop: hp('2%'),
        maxHeight: hp('18%'),
        marginLeft: wp('7%'),
        width: hp('38%'),
      },
      sendit: {
        marginTop: hp('10%'),
        marginLeft: wp('70%'),
      },
    },
    android: {
      //Would have slightly different margins and properties
    },
  }),
});
