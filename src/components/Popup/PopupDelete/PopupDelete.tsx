import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "rsuite";

interface PopupDeleteProps {
  buttonSaveContent?: string;
  buttonCancelContent?: string;
  handleConfirmDelete: (rowData) => void;
  rowDataMode?: "object" | "array";
}

const PopupDelete = forwardRef(
  (
    {
      buttonCancelContent = "Không",
      buttonSaveContent = "Có",
      handleConfirmDelete,
      rowDataMode = "object",
    }: PopupDeleteProps,
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      open: ({ content, data }) => {
        setOpen(true);
        setContent(content);
        setRowData(data);
      },
    }));

    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [rowData, setRowData] = useState<any>(
      rowDataMode === "object" ? {} : []
    );

    const handleClose = () => {
      setOpen(false);
      setContent("");
      setRowData(rowDataMode === "object" ? {} : []);
    };

    return (
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            {content}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            onClick={() => handleConfirmDelete(rowData)}
            appearance="primary"
          >
            {buttonSaveContent}
          </Button>
          <Button onClick={handleClose} appearance="default">
            {buttonCancelContent}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default PopupDelete;
