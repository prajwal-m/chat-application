export function reducer(state = {}, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      console.log("hello");
      console.log(action.payload);
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            name: action.payload.name,
            msg: action.payload.msg,
            key: Math.random()
              .toString(36)
              .substring(7)
          }
        ]
      });
      break;

    default:
      return state;
  }
}
