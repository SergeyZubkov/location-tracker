export interface AuthToken {
  token: string;
  expiration: string;
  license: { isValid: boolean };
}

export interface AuthCredentials {
  userName: string;
  password: string;
}

export interface AuthData {
  expiration: string;
  oldExpiration: string;
  token: string;
  user: User;
}

export interface User {
  firstName: string;
  email: string;
  lastName?: string;
  patronymicName?: string;
  dateOfBirth?: string;
  mobileNumber?: string;
  profileImage?: string;
  isExecutor: boolean;
  fullName?: string;
  menus: Array<IUserMenuItem>;
  routes: Array<UserRoutes>;
}

export interface IMenuKeyAndUrlItem {
  url: string;
  name: string;
}

interface UserRoutes {
  path: string;
  component: string;
}

export interface IUserMenuItem {
  children: Array<IUserMenuItem>;
  component?: string;
  iconSource?: string;
  id: string;
  name: string;
  position: number;
  title: string;
  url: string;
}
