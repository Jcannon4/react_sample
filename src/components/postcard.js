import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimeComment } from '../../api/workers/TimeZone';
import FastImage from 'react-native-fast-image';
import { doVote } from '../../redux/actions/RightNow';
import config from '../../../config.json';

const PostCard = ({ post, media, goNav }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={goNav}
        style={[
          styles.touch,
          {
            backgroundColor: colors.backgroundYellow,
            alignSelf: 'center',
          },
        ]}
      >
        <View style={[styles.padding, {}]}>
          <View style={styles.cardHeader}>
            <FastImage
              source={{
                uri: `${config.DATABASE_URL}users/${post.sender.uid}/default`,
              }}
              style={{
                resizeMode: 'contain',
                alignSelf: 'center',
                borderRadius: hp('4%'),
                width: wp('10%'),
                height: wp('10%'),
                borderRadius: wp('4%'),
                borderWidth: wp('.6%'),
                borderColor: colors.touchofgrey,
              }}
            />
            <Text>
              {`${post.data.customData.name} ${post.data.customData.emoji}`}
            </Text>
          </View>
          {/* If user has attached a media object it goes right under the header but above the text */}
          {media ? <Image source={media}></Image> : null}
          <View style={styles.flexDirection}>
            <Text
              numberOfLines={4}
              style={[
                styles.content,
                { fontFamily: fonts.medium, fontSize: 18 },
              ]}
            >
              {post.data.customData.text}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text
              style={[
                styles.school,
                { fontFamily: fonts.spaceBold, fontSize: 14 },
              ]}
            >
              {post.data.cometChatData.abbreviation}
            </Text>

            <Text
              style={[
                styles.timeSheet,
                {
                  fontFamily: fonts.spaceBoldItalic,
                  fontSize: 14,
                  color: colors.touchofgrey,
                },
              ]}
            >
              {getTimeComment(post.sentAt)}
            </Text>
            <Text
              style={[
                styles.commentStyle,
                {
                  fontFamily: fonts.spaceBoldItalic,
                  fontSize: 14,
                  color:
                    numComments === 'no comments'
                      ? colors.touchofgrey
                      : colors.primaryBlack,
                },
              ]}
            >
              {'💬' + ' ' + numComments}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  user_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user_id: state.user.user.id,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {
      touch: {
        width: wp('95%'),
        minHeight: hp('22%'),
        flexDirection: 'row',
        shadowRadius: hp('1%'),
        shadowOpacity: 0.2,
        shadowOffset: { width: wp('1%'), height: hp('.5%') },
        elevation: 2,
        borderRadius: hp('2.5%'),
        marginTop: hp('1.7%'),
      },
      padding: {
        flex: 1,
        marginLeft: wp('1%'),
      },
      flexDirection: {
        flexDirection: 'row',
      },
      cardHeader: {
        flexDirection: 'row',
        marginLeft: wp('3%'),
        marginTop: hp('1%'),
        height: 50,
      },

      trendSpace: {
        marginLeft: wp('5.3%'),
        marginTop: hp('.75%'),
        alignSelf: 'center',
      },

      footer: {
        flexDirection: 'row',
        marginTop: hp('3%'),
        marginLeft: wp('3%'),
        height: hp('5%'),
      },

      content: {
        width: wp('70%'),
        marginLeft: wp('4%'),
        marginTop: hp('1.5%'),
      },
    },
    android: {},
  }),
});
