import { useSelector } from 'react-redux';
import { storeType } from '../store';
export default function useGetUserInfo() {
  const userInfo = useSelector((state: storeType) => state.userInfo);
  const { userId, username, nickname } = userInfo;
  return { userId, username, nickname };
}
