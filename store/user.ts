import { UserCredentials } from '~/models/entities/User'

class UserState {
  credentials = new UserCredentials();
}

const UserStore = {
  state: new UserState(),
  mutations: {
    setCredentials(state: UserState, form: UserCredentials){
      state.credentials = form;
      localStorage.setItem('credentials', JSON.stringify(form));
    },
  },
  actions: {}
}

export default UserStore;

