import {messages} from '@/constants/messages';
import {create} from 'zustand';

interface IUserInfo {
  name: string;
  introduce: string;
  setName: (name: string) => void;
  setIntroduce: (introduce: string) => void;
}

const useUserInfoStore = create<IUserInfo>(set => ({
  name: messages.NICKNAME,
  introduce: messages.INTRODUCE,
  setName: (name: string) => {
    set({name});
  },
  setIntroduce: (introduce: string) => {
    set({introduce});
  },
}));

export default useUserInfoStore;
