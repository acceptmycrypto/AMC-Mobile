import * as React from 'react';
import {
  AsyncStorage,
  Alert
} from 'react-native';
import { _verifier } from '../../../src/AuthentificationService';

export default _tokenVerifier = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // let token = JSON.stringify(value);
      console.log('TOKEN!!' + value);
      return _verifier(value).then(res => {
        let tokenStr = JSON.stringify(res.verifiedToken);
        let userData = JSON.parse(tokenStr);
        console.log('STRING RETURN!!' + tokenStr);
        console.log('PARSED RETURN!!' + userData);
        return userData;
      });
    }
  } catch (error) {
    console.log('NO TOKEN!!!' + error);
  }
};
