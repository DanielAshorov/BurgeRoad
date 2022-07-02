import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

interface IDialog {
  title?: string;
  subTitle?: string;
  onClickConfirm: Function;
  isOpen: boolean;
}
const Modal = ({ isOpen, title, subTitle, onClickConfirm }: IDialog) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => null}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subTitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*<Button onClick={handleClose}>Disagree</Button>*/}
          <Button onClick={() => onClickConfirm()}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
