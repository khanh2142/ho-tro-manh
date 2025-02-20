import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, FlexboxGrid, Form, Heading, Schema, Stack } from "rsuite";
import PasswordField from "../../../components/PasswordField/PasswordField";
import RequireField from "../../../components/RequireField/RequireField";
const { StringType } = Schema.Types;

const ChangePassword = () => {
  const passwordRule = StringType()
    .isRequired("Mật khẩu là bắt buộc.")
    .pattern(
      /^[A-Za-zÀ-ỹà-ỹ][A-Za-zÀ-ỹà-ỹ0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~]*$/,
      "Mật khẩu phải bắt đầu bằng chữ cái và không chứa dấu cách."
    )
    .maxLength(500, "Mật khẩu không được vượt quá 500 ký tự.");

  const passwordNewRule = StringType()
    .isRequired("Mật khẩu mới là bắt buộc.")
    .pattern(
      /^[A-Za-zÀ-ỹà-ỹ][A-Za-zÀ-ỹà-ỹ0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~]*$/,
      "Mật khẩu phải bắt đầu bằng chữ cái và không chứa dấu cách."
    )
    .maxLength(500, "Mật khẩu không được vượt quá 500 ký tự.")
    .addRule((value, data) => {
      return value != data.password;
    }, "Mật khẩu mới không được giống với mật khẩu hiện tại.");

  const model = Schema.Model({
    password: passwordRule,
    passwordNew: passwordNewRule,
    passwordNewCheck: StringType()
      .addRule(
        (value, data) => value === data.passwordNew,
        "Mật khẩu xác nhận không khớp."
      )
      .isRequired("Xác nhận mật khẩu mới là bắt buộc."),
  });

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<any>({
    password: "",
    passwordNew: "",
    passwordNewCheck: "",
  });

  const onChange = (formValue: any) => {
    setFormValue(formValue);
  };

  const handleSave = () => {
    console.log(formValue);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Form formValue={formValue} onChange={onChange} model={model}>
      <Heading level={5}>Thay đổi mật khẩu</Heading>

      <FlexboxGrid>
        <FlexboxGrid.Item
          colspan={24}
          style={{
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Form.Group>
            <Form.ControlLabel
              style={{
                fontWeight: "bold",
              }}
            >
              <RequireField content="Mật khẩu hiện tại" />
            </Form.ControlLabel>
            <Form.Control
              accepter={PasswordField}
              name="password"
              value={formValue.password}
              onChange={(value) => onChange({ ...formValue, password: value })}
            />
          </Form.Group>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item
          colspan={24}
          style={{
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Form.Group>
            <Form.ControlLabel
              style={{
                fontWeight: "bold",
              }}
            >
              <RequireField content="Mật khẩu mới" />
            </Form.ControlLabel>
            <Form.Control
              accepter={PasswordField}
              name="passwordNew"
              value={formValue.passwordNew}
              onChange={(value) =>
                onChange({ ...formValue, passwordNew: value })
              }
            />
          </Form.Group>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item
          colspan={24}
          style={{
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <Form.Group>
            <Form.ControlLabel
              style={{
                fontWeight: "bold",
              }}
            >
              <RequireField content="Xác nhận mật khẩu mới" />
            </Form.ControlLabel>
            <Form.Control
              accepter={PasswordField}
              name="passwordNewCheck"
              value={formValue.passwordNewCheck}
              onChange={(value) =>
                onChange({ ...formValue, passwordNewCheck: value })
              }
            />
          </Form.Group>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <Stack spacing={10}>
        <Button appearance="primary" type="submit" onClick={handleSave}>
          Lưu
        </Button>
        <Button appearance="default" onClick={handleCancel}>
          Hủy
        </Button>
      </Stack>
    </Form>
  );
};

export default ChangePassword;
