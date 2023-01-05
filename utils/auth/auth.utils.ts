import { ITokenInfo } from '~/interfaces';

import localStorageHelper, { KeyStorage } from '../localStorage';

export const getTokenInfo = async () => {
  try {
    const tokenInfo: ITokenInfo = localStorageHelper.getObject(KeyStorage.X_TOKEN, null);
    if (tokenInfo && tokenInfo?.access_token) {
      return tokenInfo as ITokenInfo;
    }
  } catch (error) {
    setTokenInfo(null);
    return null;
  }
};

export const setTokenInfo = (tokenInfo: ITokenInfo | null) => {
  localStorageHelper.setObject(KeyStorage.X_TOKEN, {
    ...tokenInfo,
    expires_at: Date.now() + Number(tokenInfo?.expires_in) * 1000,
  });
};

export const getTokenStatus = async () => {
  const tokenInfo = await getTokenInfo();
  const now = Date.now();

  return tokenInfo?.access_token && tokenInfo?.expires_at > now;
};
