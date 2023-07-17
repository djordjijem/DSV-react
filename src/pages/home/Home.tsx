import * as React from 'react';
import { useMemo, useReducer, useState } from 'react';
import { IUser } from '../../interface/user.interface';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <Box component="h2" data-testid="home__count">
              Count: {countState.count}
            </Box>
            <Box component="div">
              <Box component="div">
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={text}
                  inputProps={{ 'data-testid': 'first-input' }}
                  onChange={setInputText}
                />
              </Box>
              <Box component="div">
                <Button variant="outlined" onClick={() => dispatch({ type: 'decrement' })}>
                  -
                </Button>
                <Button variant="contained" onClick={() => dispatch({ type: 'increment' })} sx={{ margin: '.5rem' }}>
                  +
                </Button>
              </Box>
            </Box>

            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  data-testid="random-increment"
                  onClick={() => dispatch({ type: 'incrementRandom' })}
                  variant="outlined"
                  color="success"
                >
                  Random Increment
                </Button>
              </Grid>
              <Grid item>
                <Button
                  data-testid="next-odd"
                  onClick={() => dispatch({ type: 'incrementToNearestOdd' })}
                  variant="contained"
                  color="secondary"
                >
                  Next odd
                </Button>
              </Grid>
              <Grid item>
                <Button data-testid="decrement-by-input-value" onClick={decreaseCount} variant="contained" color="error">
                  Decrement by input value
                </Button>
              </Grid>
              <Grid item>
                <Button data-testid="reset" onClick={() => dispatch({ type: 'reset' })} variant="contained" color="warning">
                  Reset count
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" flexDirection="column">
            <TextField
              id="outlined-textarea"
              label="Search for a user"
              placeholder="Search"
              multiline
              defaultValue={searchTerm}
              sx={{ display: 'block', margin: 'auto', marginTop: '20px' }}
              onChange={searchUsers}
              inputProps={{ 'data-testid': 'search-users-input' }}
            />
            <Grid item container spacing={2} justifyContent="center">
              {displayedUsers.map((user, i) => {
                return (
                  <Grid item component="div" key={i} data-testid={user.username}>
                    <UserCard user={user} onRemove={removeUser} onRestore={restoreUser} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
