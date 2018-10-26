// @flow
import {Platform} from 'react-native';

// TODO: Move out of version control?
export const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
