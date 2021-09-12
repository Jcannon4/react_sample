//Setup state to hold data for application
const initialState = {
  posts: [],
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //When the action fires and post is fulfilled do the following
    case 'ADD_POST_FULFILLED':
      return {
        ...state, //return current state of the app before changes
        posts: [action.payload, ...state.posts], //modify posts, push action.payload (current post to the redux state)
      };
  }
}
