import { addPost } from '../../api/RightNow';

export const doGoAddPost = (formData, uid) => ({
  type: 'ADD_POST',
  payload: addPost(formData, uid),
});
