import { store } from '../redux/index';
import { CometChat } from '@cometchat-pro/react-native-chat';
import config from '../../config.json';
import { RNS3 } from 'react-native-upload-aws-s3';

export const addPost = async (formData, uid) => {
  try {
    //Query our database for the user data, Note this is ineffiecent since we could just pass the user name into function itself,
    //Yet I did it anyway to show a realistic backend query that could be written
    const url = `${config.API_URL}rightnow/search_user`;
    const body = {
      user_id: uid,
    };
    let res = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    }); //We wont use this res object, just showing what a backend query would look like

    //API Cometchat code that I've used, this library documentation is available at
    //
    var receiverID = 'global01'; //Group id that post is sent to
    var messageText = formData.content; //Message we want sent
    var receiverType = CometChat.RECEIVER_TYPE.GROUP; //This is a group message
    //Custom CometChat API functio below
    var textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );
    let message = await CometChat.sendMessage(textMessage);
    return message; //This will be our action.payload in our redux/reducer file
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};
