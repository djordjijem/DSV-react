import * as React from 'react';
import { User } from '../../../interface/user.interface';
import { ActionButtonColor, ActionButtonSize, CustomCard } from '../../../components/CustomCard';

export const UserCard: React.FC<{ user: User }> = ({ user: { age, username, companyName, address } }) => {
  const onClick = () => console.log('remove me');

  const actionsProps = {
    cardActionsClassName: 'user-card__card-actions',
    buttonClassName: 'user-card__card-actions__button',
    size: ActionButtonSize.S,
    onClick,
    color: ActionButtonColor.PR,
    text: 'Click me',
  };

  return (
    <CustomCard actionsProps={actionsProps} cardClassName="user-card" contentClassName="user-card__content">
      <p>Username: {username}</p>
      <p>Address: {`${address.street}, ${address.city}, ${address.zipcode}`}</p>
      <p>Age: {age}</p> d<p>Company name: {companyName}</p>
    </CustomCard>
  );
};
