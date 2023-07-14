import * as React from 'react';
import { IUser } from '../../../interface/user.interface';
import { ActionButtonColor, ActionButtonSize, CustomCard } from '../../../components/CustomCard';

interface UserCardProps {
  user: IUser;
  onRemove: (id: string) => void;
  hasRestoreButton?: boolean;
  onRestore: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user: { age, username, companyName, address, id, isRemoved },
  onRemove,
  onRestore,
}) => {
  const actionsProps = {
    cardActionsClassName: 'user-card__card-actions',
    buttonClassName: 'user-card__card-actions__button',
    size: ActionButtonSize.S,
    onRemove: () => onRemove(id),
    color: ActionButtonColor.PR,
    text: 'remove',
    hasRestoreButton: isRemoved,
    onRestore: () => onRestore(id),
  };

  return (
    <CustomCard actionsProps={actionsProps} cardClassName="user-card" contentClassName="user-card__content">
      <p>Username: {username}</p>
      <p>Address: {`${address.street}, ${address.city}, ${address.zipcode}`}</p>
      <p>Age: {age}</p> d<p>Company name: {companyName}</p>
    </CustomCard>
  );
};
