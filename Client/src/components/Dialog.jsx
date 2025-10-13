import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

const CustomDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
        //   backgroundColor: "rgba(255, 255, 255, 0.1)", // transparent white
        //   backdropFilter: "blur(20px)", // blur effect
          borderRadius: "16px", // rounded corners
          border: "1px solid rgba(255, 255, 255, 0.2)", // subtle border
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // soft shadow
        },
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <DialogTitle className="!p-0 text-lg font-extrabold text-violet-600">
          {title}
        </DialogTitle>
        <IconButton onClick={onClose} className="text-gray-600 hover:text-red-500">
          <IoClose size={20} />
        </IconButton>
      </div>

      {/* Content */}
      <DialogContent className="px-4">{children}</DialogContent>

      {/* Footer Actions */}
      {actions && (
        <DialogActions className="px-4 pb-4 flex gap-2">{actions}</DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
