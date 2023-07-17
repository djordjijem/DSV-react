import * as React from 'react';
import { IUser } from '../../../interface/user.interface';
import { ActionButtonColor, ActionButtonSize, ActionButtonVariant, CustomCard } from '../../../components/CustomCard';
import { Typography } from '@mui/material';

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
    cardActionsClassName: '',
    buttonClassName: '',
    size: ActionButtonSize.S,
    onRemove: () => onRemove(id),
    color: ActionButtonColor.WARN,
    restoreColor: ActionButtonColor.SUCC,
    text: 'remove',
    hasRestoreButton: isRemoved,
    onRestore: () => onRestore(id),
    variant: ActionButtonVariant.OUTLINED,
  };

  const styles = { maxWidth: 300, borderRadius: '.5rem', marginTop: '1rem', border: '2px solid #F0F0F0' };

  return (
    <CustomCard actionsProps={actionsProps} styles={styles} cardClassName="user-card" contentClassName="user-card__content">
      <Typography fontSize={16} color="text.primary" gutterBottom>
        Username: {username}
      </Typography>
      <Typography fontSize={14} color="text.secondary" gutterBottom>
        Address: {`${address.street}, ${address.city}, ${address.zipcode}`}
      </Typography>
      <Typography fontSize={14} color="text.secondary" gutterBottom>
        Age: {age}
      </Typography>
      <Typography fontSize={14} color="text.secondary" gutterBottom>
        Company name: {companyName}
      </Typography>
    </CustomCard>
  );
};
