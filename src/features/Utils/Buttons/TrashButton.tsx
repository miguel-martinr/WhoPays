
import { Button, ButtonProps } from "react-bootstrap";
import { BsFillTrashFill } from 'react-icons/bs';


export interface CloseButtonProps extends ButtonProps {
  iconColor?: string,
  iconSize?: number
}

const defaultProps = {
  iconColor: '#000000',
  iconSize: 20,
}

export const TrashButton = ({ children, 
  style, 
  iconColor, 
  iconSize,
  ...rest }: CloseButtonProps = defaultProps) => {

  iconColor = iconColor || '#000000';
  const closeButtonStyle = {
    border: 'none',
    backgroundColor: 'transparent',
  };

  return (    
      <Button style={{...closeButtonStyle, ...style}} {...rest}>
        <BsFillTrashFill color={iconColor} size={iconSize} />
      </Button>
  )
}
