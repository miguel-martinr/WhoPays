import { ButtonProps } from 'react-bootstrap'
import { BsLink } from 'react-icons/bs';
import { AdaptiveButton } from './AdaptiveButton'

export interface LinkButtonProps extends ButtonProps {
  text: string,
}

export const LinkButton = (props: LinkButtonProps) => {

  const { text, children } = props;
  return (
    <AdaptiveButton
      contentWhenSM={<BsLink size={20} />}
      contentWhenLG={text}
    >

      {children}
    </AdaptiveButton>
  )
}
