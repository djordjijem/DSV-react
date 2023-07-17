import { useEffect, useState } from 'react';
import usersData from '../../../data';
import { makeId } from '../../../utils';
import { IUser } from '../../../interface/user.interface';

export const useUsers = (initialState: IUser[]) => {
  const [users, setUsers] = useState(initialState);

  useEffect(() => {
    if (usersData && usersData.length > 0) {
      const filteredUsers = usersData.filter((user) => user.age >= 18);
      const mappedUsers = filteredUsers.map(({ username, address, age, company }) => ({
        username,
        address,
        age,
        companyName: company.name,
      }));
      const mappedUsersWithId = mappedUsers.map((user) => ({
        ...user,
        id: makeId(6, 'ABCDEF123456'),
      }));
      const sortedUsersByAge = [...mappedUsersWithId].sort((a, b) => a.age - b.age);
      const sortedUsersByCompanyName = sortUsersByCompanyName([...sortedUsersByAge]);

      setUsers(sortedUsersByCompanyName);
    }
  }, [usersData]);

  const sortUsersByCompanyName = (users: IUser[]): IUser[] => {
    return users.sort((a, b) => {
      const companyA = a.companyName.toUpperCase();
      const companyB = b.companyName.toUpperCase();
      if (companyA < companyB) return -1;
      if (companyA > companyB) return 1;
      return 0;
    });
  };

  return {
    users,
    setUsers,
    sortUsersByCompanyName,
  };
};
