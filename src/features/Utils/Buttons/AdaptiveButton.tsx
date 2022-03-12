import { useEffect, useState } from "react"
import { Button, ButtonProps } from "react-bootstrap"
import { getBSSize } from "../ScreenSizeBreakPoints";
import classes from "./styles.module.css"

export interface AdaptiveButtonProps extends ButtonProps {
  contentWhenSM?: any,
  contentWhenMD?: any,
  contentWhenLG?: any,
}

export const AdaptiveButton = (props: AdaptiveButtonProps) => {
  let { contentWhenSM,
    contentWhenMD,
    contentWhenLG,
    children,
    style,
    ...rest } = props;

  contentWhenSM = contentWhenSM || '';
  contentWhenMD = contentWhenMD || contentWhenSM;
  contentWhenLG = contentWhenLG || contentWhenMD;

  style = {...style, border: 'none'};

  const [BSSize, setBSSize] = useState(getBSSize());
  useEffect(() => {
    const resizeListener = () => {
      setBSSize(getBSSize())
    }
    window.addEventListener("resize", resizeListener)
    return () => {
      window.removeEventListener("resize", resizeListener)
    }

  });

  return (
    <Button className={classes.linkButton + ' w-75'} style={style} {...rest}>
      {
        ['xs', 'sm'].includes(BSSize) ? contentWhenSM :
          BSSize === "md" ? contentWhenMD :
            BSSize === "lg" ? contentWhenLG : contentWhenLG
      }

      {children}
    </Button>
  )
}
