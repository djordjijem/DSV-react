import * as React from 'react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { IUser } from '../../interface/user.interface';
import usersData from '../../data';
import { makeId } from '../../utils';
import { Box, Button, TextField } from '@mui/material';
import { UserCard } from './components/UserCard';
import { initialState, reducer } from './reducer';
import { useUsers } from './hooks/useUsers';

export function Home() {
  const { users, setUsers, sortUsersByCompanyName } = useUsers([]);
  const [removedUsers, setRemovedUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [countState, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState<string>('');

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
    setSearchTerm(e.target.value.trim().toLowerCase());
  };

  const restoreUser = (id: string) => {
    const removedUser = removedUsers.find((user) => user.id === id);
    if (removedUser) {
      //restore user
      removedUser.isRemoved = false;
      const sortedUsers = sortUsersByCompanyName([...users, removedUser]);
      //sort users as they were before
      setUsers(sortedUsers);
      //restore removed users
      const removedUsersChanged = removedUsers.filter((user) => user.id !== removedUser.id);
      setRemovedUsers(removedUsersChanged);
    }
  };

  const setInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || Number(e.target.value) < 0) return;
    setText(e.target.value);
  };
  const decreaseCount = () => {
    dispatch({ type: 'decrementByUserInput', payload: { newState: Number(text) } });
  };

  const displayedUsers = useMemo(() => {
    if (searchTerm.length) {
      const searchedUsers = users.filter((user) => user.username.trim().toLowerCase().includes(searchTerm));
      const searchedRemovedUsers = removedUsers.filter((user) => user.username.trim().toLowerCase().includes(searchTerm));
      return [...searchedUsers, ...searchedRemovedUsers];
    }
    return users;
  }, [searchTerm, users, removedUsers]);

  return (
    <div>
      <p style={{ marginBottom: 0 }} data-testid="count">
        Count: {countState.count}
      </p>
      <TextField
        defaultValue={text}
        type="number"
        style={{ display: 'block' }}
        inputProps={{ 'data-testid': 'first-input' }}
        onChange={setInputText}
      />
      <Button variant="contained" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </Button>
      <Button variant="contained" onClick={() => dispatch({ type: 'increment' })}>
        +
      </Button>
      <Box component="p" style={{ marginBottom: 0, marginTop: 30 }}>
        Search for a user
      </Box>
      <Button data-testid="random-increment" onClick={() => dispatch({ type: 'incrementRandom' })}>
        Random Increment
      </Button>
      <Button data-testid="next-odd" onClick={() => dispatch({ type: 'incrementToNearestOdd' })}>
        Next odd
      </Button>
      <Button data-testid="decrement-by-input-value" onClick={decreaseCount}>
        Decrement by input value
      </Button>
      <Button data-testid="reset" onClick={() => dispatch({ type: 'reset' })}>
        Reset count
      </Button>
      <TextField
        defaultValue={searchTerm}
        style={{ display: 'block', margin: 'auto' }}
        onChange={searchUsers}
        inputProps={{ 'data-testid': 'search-users-input' }}
      />
      {displayedUsers.map((user, i) => {
        return (
          <Box component="div" key={i} data-testid={user.username}>
            <UserCard user={user} onRemove={removeUser} onRestore={restoreUser} />;
          </Box>
        );
      })}
    </div>
  );
}
