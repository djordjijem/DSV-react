import * as React from 'react';
import { PropsWithChildren } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export enum ActionButtonSize {
  S = 'small',
  M = 'medium',
  L = 'large',
}

export enum ActionButtonColor {
  IN = 'inherit',
  PR = 'primary',
  SEC = 'secondary',
  SUCC = 'success',
  ERR = 'error',
  INFO = 'info',
  WARN = 'warning',
}
interface ICustomCardProps {
  cardClassName?: string;
  contentClassName?: string;
  actionsProps: {
    cardActionsClassName?: string;
    buttonClassName?: string;
    onClick: () => void;
    size: ActionButtonSize;
    text: string;
    color: ActionButtonColor;
  };
}

export const CustomCard: React.FC<ICustomCardProps> = ({ cardClassName, contentClassName, actionsProps, children }) => {
  return (
    <Card sx={{ minWidth: 275 }} className={cardClassName}>
      <CardContent className={contentClassName}>{children}</CardContent>
      <CardActions className={actionsProps.cardActionsClassName}>
        <Button size={actionsProps.size} className={actionsProps.buttonClassName} color={actionsProps.color} onClick={actionsProps.onClick}>
          {actionsProps.text}
        </Button>
      </CardActions>
    </Card>
  );
};
