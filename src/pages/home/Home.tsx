import * as React from 'react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { IUser } from '../../interface/user.interface';
import usersData from '../../data';
import { makeId } from '../../utils';
import { Box, Button, TextField } from '@mui/material';
import { UserCard } from './components/UserCard';

interface IState {
  count: number;
}

interface IAction {
  type: string;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [numberInput] = useState<number>(0);
  const [text] = useState<string>('');
  const [countState, dispatch] = useReducer(reducer, { count: 0 });
  const [removedUsers, setRemovedUsers] = useState<IUser[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const removeUser = (id: string) => {
    const newUsersState = users.filter((user) => user.id !== id);
    const removedUser = users.find((user) => user.id === id);
    if (removedUser) {
      removedUser.isRemoved = true;
    }
    setUsers(newUsersState);
    if (removedUser) {
      setRemovedUsers([...removedUsers, removedUser]);
    }
  };

  const searchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm === '') {
      setSearchedUsers([]);
      setSearchTerm('');
      return;
    }
    const searchedUsers = users.filter((user) => user.username.trim().toLowerCase().includes(searchTerm));
    const searchedRemovedUsers = removedUsers.filter((user) => user.username.trim().toLowerCase().includes(searchTerm));
    setSearchTerm(searchTerm);
    setSearchedUsers([...searchedUsers, ...searchedRemovedUsers]);
  };

  const restoreUser = (id: string) => {
    const removedUser = removedUsers.find((user) => user.id === id);
    if (removedUser) {
      //restore user
      removedUser.isRemoved = false;
      const sortedUsers = sortUsersByCompanyName([...users, removedUser]);
      //sort users as they were before
      setUsers(sortedUsers);
    }
  };

  const displayedUsers = useMemo(() => {
    if (searchTerm.length) return searchedUsers;
    return users;
  }, [searchTerm, searchedUsers, users]);

  //3. Display the users' properties using a loop in the tsx, preferably in a styled "Card" form
  //    3.1. Add a "remove" button to each card - this should remove the user from the state
  //    3.2. Store the removed users in a new state instance
  //    3.3. Using the second input, add a method to search for a user's username with the onChange event
  //    3.4. The removed users should also be found if the input is being used to search for a username
  //    3.5. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array

  return (
    <div>
      <p style={{ marginBottom: 0 }}>Count: {countState.count}</p>
      <TextField defaultValue={numberInput} type="number" style={{ display: 'block' }} />
      <Button variant="contained" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </Button>
      <Button variant="contained" onClick={() => dispatch({ type: 'increment' })}>
        +
      </Button>
      <Box component="p" style={{ marginBottom: 0, marginTop: 30 }}>
        Search for a user
      </Box>
      <TextField defaultValue={text} style={{ display: 'block', margin: 'auto' }} onChange={searchUsers} />
      {displayedUsers.map((user, i) => {
        return (
          <Box component="div" key={i}>
            <UserCard user={user} onRemove={removeUser} onRestore={restoreUser} />;
          </Box>
        );
      })}
    </div>
  );
}
