import * as React from 'react';
import { User } from '../../../interface/user.interface';
import { ActionButtonColor, ActionButtonSize, CustomCard } from '../../../components/CustomCard';

export const UserCard: React.FC<{ user: User; onClick: (id: string) => void }> = ({
  user: { age, username, companyName, address, id },
  onClick,
}) => {
  const actionsProps = {
    cardActionsClassName: 'user-card__card-actions',
    buttonClassName: 'user-card__card-actions__button',
    size: ActionButtonSize.S,
    onClick: () => onClick(id),
    color: ActionButtonColor.PR,
    text: 'remove',
  };

  return (
    <CustomCard actionsProps={actionsProps} cardClassName="user-card" contentClassName="user-card__content">
      <p>Username: {username}</p>
      <p>Address: {`${address.street}, ${address.city}, ${address.zipcode}`}</p>
      <p>Age: {age}</p> d<p>Company name: {companyName}</p>
    </CustomCard>
  );
};
