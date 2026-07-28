import { readonly, ref } from 'vue';
import { AuthService } from './auth.service';

const _user = ref(null);

export const user = readonly(_user);

export async function setUser() {
  if (!(await AuthService.getLoggedIn())) {
    return;
  }

  const [user, err] = await AuthService.getUser();

  if (err) {
    return;
  }

  _user.value = user;
}
