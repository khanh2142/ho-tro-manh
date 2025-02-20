import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  FlexboxGrid,
  Form,
  Input,
  Modal,
  Schema,
  SelectPicker,
} from "rsuite";
const { StringType, NumberType } = Schema.Types;

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const PopupAddress = forwardRef(({}, ref) => {
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
    // item: StringType().isRequired("Vui lòng nhập hạng mục"),
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
          Sửa địa chỉ liên hệ
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
                  Tỉnh/Thành phố
                </Form.ControlLabel>
                <Form.Control
                  name="provinceCode"
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
                  Quận/Huyện
                </Form.ControlLabel>
                <Form.Control
                  name="districtCode"
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
                  Phường/Xã
                </Form.ControlLabel>
                <Form.Control
                  name="wardCode"
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
            ></FlexboxGrid.Item>

            <FlexboxGrid.Item
              colspan={24}
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
                  Tên đường, Số nhà, Tòa nhà
                </Form.ControlLabel>
                <Form.Control
                  name="address"
                  accepter={Textarea}
                  className="textarea"
                  rows={5}
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

export default PopupAddress;
