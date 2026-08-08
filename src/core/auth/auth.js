import { readonly, ref } from 'vue';
import { AuthService } from './auth.service';

const _user = ref(null);
const _userProfile = ref(null);

export const user = readonly(_user);
export const userProfile = readonly(_userProfile);

export async function setUser() {
  if (!(await AuthService.getLoggedIn())) {
    return;
  }

  const [user, err] = await AuthService.getUser();

  if (err) {
    return;
  }

  _user.value = user;

  setProfile();
}

export async function setProfile() {
  const [profile, err] = await AuthService.getProfile();

  if (err) {
    return;
  }

  _userProfile.value = profile;
}
