import { ButtonProps } from 'react-bootstrap'
import { BsLink } from 'react-icons/bs';
import { AdaptiveButton } from './AdaptiveButton'

export interface LinkButtonProps extends ButtonProps {
  text: string,
}

export const LinkButton = (props: LinkButtonProps) => {

  const { text, children, ...rest } = props;
  return (
    <AdaptiveButton
      contentWhenSM={text}
      contentWhenLG={text}
      {...rest}
    >

      {children}
    </AdaptiveButton>
  )
}
