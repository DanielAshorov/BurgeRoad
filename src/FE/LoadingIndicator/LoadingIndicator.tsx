import { CircularProgress, Modal } from "@mui/material";
import React from "react";
import { useStyles } from "./LoadingIndecator.style";
import BurgerIcon from "../../../burgerIcon.svg";

interface ILoadingIndicator {
  isLoading: boolean;
}

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const LoadingIndicator = ({ isLoading }: ILoadingIndicator) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <CircularProgress className={classes.loadingCircle} thickness={2} size={"10rem"} />
      <img src={BurgerIcon} alt="" className={classes.LogoSvg} />
    </div>
  );
  return (
    <>
      <div>
        <Modal
          hideBackdrop={true}
          open={isLoading}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ zIndex: 1302 }}
        >
          {body}
        </Modal>
      </div>
    </>
  );
};

export default LoadingIndicator;
