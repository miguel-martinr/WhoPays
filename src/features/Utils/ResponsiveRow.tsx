import { Row, RowProps } from "react-bootstrap"
import { useSmallDisplay } from "../../app/hooks";

export const ResponsiveRow = ({ children, style, ...rest }: RowProps) => {

  const isSmallDisplay = useSmallDisplay();
  const responsiveStyle = {...style, display: isSmallDisplay ? 'block' : 'flex'};
  return (
    <Row style={responsiveStyle} {...rest}>
      {children}
    </Row>
  )
}
