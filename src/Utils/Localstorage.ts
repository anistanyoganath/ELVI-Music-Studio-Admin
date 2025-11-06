import type { ProfileModel } from "./ProfileModel";
import { localStorageKeys } from "./LocalStoragekeys";

export class LocalStorage {
  static getLoggedInStatus() {
    let isLoggedIn = localStorage.getItem(localStorageKeys.isLoggedIn);
    return isLoggedIn !== null && isLoggedIn === "true";
  }

  static updateLoggedInStatus(isLoggedIn: boolean, token: string) {
    localStorage.setItem(localStorageKeys.isLoggedIn, `${isLoggedIn}`);
    localStorage.setItem(localStorageKeys.token, token);
  }
  static getToken() {
    let token = localStorage.getItem(localStorageKeys.token);
    if (token === null) {
      token = "";
    }
    return token;
  }

  static GetProfileModel() {
    let profileModel = null;
    let profileString = localStorage.getItem(localStorageKeys.profile);
    if (profileString) {
      profileModel = JSON.parse(profileString) as ProfileModel;
    }
    return profileModel;
  }
  static async clearStorage() {
    await localStorage.clear();
  }
  static async getLocalStorageKeys() {
    return await Object.keys(localStorage);
  }
}
