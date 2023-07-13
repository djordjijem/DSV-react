import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { User } from '../../interface/user.interface';
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
  const [users, setUsers] = useState<User[]>([]);
  const [numberInput] = useState<number>(0);
  const [text] = useState<string>('');
  const [countState, dispatch] = useReducer(reducer, { count: 0 });

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
      const sortedUsersByCompanyName = [...sortedUsersByAge].sort((a, b) => {
        const companyA = a.companyName.toUpperCase();
        const companyB = b.companyName.toUpperCase();
        if (companyA < companyB) return -1;
        if (companyA > companyB) return 1;
        return 0;
      });

      setUsers(sortedUsersByCompanyName);
    }
  }, [usersData]);

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
      <TextField defaultValue={text} style={{ display: 'block', margin: 'auto' }} />
      {users.map((user) => {
        return (
          <Box component="div" key={user.id}>
            <UserCard user={user} />;
          </Box>
        );
      })}
    </div>
  );
}