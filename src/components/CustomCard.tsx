import * as React from 'react';
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

export enum ActionButtonVariant {
  TEXT = 'text',
  OUTLINED = 'outlined',
  CONTAINED = 'contained',
}
interface ICustomCardProps {
  cardClassName?: string;
  contentClassName?: string;
  actionsProps: {
    cardActionsClassName?: string;
    buttonClassName?: string;
    onRemove: () => void;
    onRestore: () => void;
    size: ActionButtonSize;
    text: string;
    color: ActionButtonColor;
    restoreColor: ActionButtonColor;
    hasRestoreButton?: boolean;
    variant?: ActionButtonVariant;
  };
  styles?: React.CSSProperties;
}

export const CustomCard: React.FC<ICustomCardProps> = ({ cardClassName, contentClassName, actionsProps, children, styles }) => {
  return (
    <Card sx={styles} className={cardClassName}>
      <CardContent className={contentClassName}>{children}</CardContent>
      <CardActions className={actionsProps.cardActionsClassName}>
        <Button
          size={actionsProps.size}
          className={actionsProps.buttonClassName}
          color={actionsProps.color}
          onClick={actionsProps.onRemove}
          variant={actionsProps.variant}
        >
          {actionsProps.text}
        </Button>
        {actionsProps.hasRestoreButton && (
          <Button
            className={actionsProps.buttonClassName}
            size={actionsProps.size}
            color={actionsProps.restoreColor}
            onClick={actionsProps.onRestore}
            variant={actionsProps.variant}
          >
            restore
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
