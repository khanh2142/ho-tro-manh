import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, FlexboxGrid, Form, Modal, Schema, SelectPicker } from "rsuite";
import RequireField from "../../../../components/RequireField/RequireField";
const { StringType, NumberType } = Schema.Types;

const PopupCategory = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    create: () => {
      setType("create");
      setOpen(true);
    },
    edit: (formValue: any) => {
      setType("edit");
      setFormValue(formValue);
      setOpen(true);
    },
  }));

  const formRef = useRef<any>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"create" | "edit">("create");
  const [formValue, setFormValue] = useState<any>({
    status: "active",
  });

  const onChange = (formValue: any) => {
    setFormValue(formValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const model = Schema.Model({
    userName: StringType().isRequired("Vui lòng nhập tên tài khoản"),
    firstName: StringType().isRequired("Vui lòng nhập họ"),
    lastName: StringType().isRequired("Vui lòng nhập tên"),
    // category: StringType().isRequired("Vui lòng nhập danh mục"),
    email: StringType()
      .isEmail("Vui lòng nhập đúng định dạng email")
      .isRequired("Vui lòng nhập email"),
    phone: StringType()
      .addRule((value) => {
        if (!value) {
          return false;
        }
        return value.replace(/\D/g, "").length === 10;
      }, "Vui lòng nhập đúng định dạng số điện thoại")
      .isRequired("Vui lòng nhập số điện thoại"),
  });

  const handleSubmit = () => {
    formRef.current.click();
  };

  return (
    <Modal open={open} onClose={handleClose} backdrop="static" size="md">
      <Modal.Header>
        <Modal.Title
          style={{
            fontWeight: "bold",
          }}
        >
          {type === "create" ? "Tạo mới danh mục" : "Chỉnh sửa danh mục"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form formValue={formValue} onChange={onChange} model={model}>
          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: 10,
              }}
            >
              <Form.Group>
                <Form.ControlLabel
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <RequireField content="Mã danh mục" />
                </Form.ControlLabel>
                <Form.Control name="categoryCode" />
              </Form.Group>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: 10,
              }}
            >
              <Form.Group>
                <Form.ControlLabel
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <RequireField content="Tên danh mục" />
                </Form.ControlLabel>
                <Form.Control name="categoryName" />
              </Form.Group>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: 10,
              }}
            >
              <Form.Group>
                <Form.ControlLabel
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Trạng thái
                </Form.ControlLabel>
                <Form.Control
                  name="status"
                  accepter={SelectPicker}
                  data={[
                    { label: "Đang hoạt động", value: "active" },
                    { label: "Không hoạt động", value: "inactive" },
                  ]}
                  style={{
                    width: 300,
                  }}
                />
              </Form.Group>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <button ref={formRef} hidden type="submit"></button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary">
          Lưu
        </Button>
        <Button onClick={handleClose} appearance="default">
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default PopupCategory;
