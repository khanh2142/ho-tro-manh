import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, FlexboxGrid, Form, Modal, Schema, SelectPicker } from "rsuite";
import RequireField from "../../../../components/RequireField/RequireField";
const { StringType, NumberType } = Schema.Types;

const PopupUser = forwardRef(({}, ref) => {
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
    // department: StringType().isRequired("Vui lòng nhập phòng ban"),
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
          {type === "create" ? "Tạo mới người dùng" : "Chỉnh sửa người dùng"}
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
                  <RequireField content="Tên tài khoản" />
                </Form.ControlLabel>
                <Form.Control name="userName" />
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
                  <RequireField content="Họ" />
                </Form.ControlLabel>
                <Form.Control name="firstName" />
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
                  <RequireField content="Tên" />
                </Form.ControlLabel>
                <Form.Control name="lastName" />
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
                  Phòng ban
                </Form.ControlLabel>
                <Form.Control
                  name="department"
                  accepter={SelectPicker}
                  data={[]}
                  style={{
                    width: 300,
                  }}
                />
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
                  <RequireField content="Email" />
                </Form.ControlLabel>
                <Form.Control name="email" />
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
                  <RequireField content="Số điện thoại" />
                </Form.ControlLabel>
                <Form.Control name="phone" />
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

export default PopupUser;
