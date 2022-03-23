import { useContext } from 'react';
import { MemberContext } from '../../contex/MemberProvider/MemberProvider';

const useMember = () => {
  return useContext(MemberContext)
};

export default useMember;