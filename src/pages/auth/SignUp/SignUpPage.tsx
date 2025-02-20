import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Content,
  FlexboxGrid,
  Form,
  Message,
  Panel,
  Schema,
  Stack,
  Text,
  useToaster,
} from "rsuite";
import { useAuthStore } from "../../../store/useAuthStore";

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired("Tên đăng nhập là bắt buộc."),
  password: StringType().isRequired("Mật khẩu là bắt buộc."),
  confirmPassword: StringType()
    .addRule(
      (value, data) => value === data.password,
      "Mật khẩu xác nhận không khớp."
    )
    .isRequired("Xác nhận mật khẩu là bắt buộc."),
  email: StringType()
    .isEmail("Email không hợp lệ.")
    .isRequired("Email là bắt buộc."),
});

const SignUpPage = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [formError, setFormError] = useState({});
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const toaster = useToaster();

  const onChange = (formValue) => {
    setFormValue(formValue);
  };

  const handleSubmit = () => {
    if (
      !formError.username &&
      !formError.password &&
      !formError.confirmPassword &&
      !formError.email
    ) {
      // Giả sử đây là thông tin người dùng hợp lệ
      const user = {
        username: formValue.username,
        fullName: faker.person.fullName(),
        avatar: faker.image.avatar(),
        email: formValue.email,
        phone: faker.phone.number(),
      };
      login(user);
      navigate("/");
    } else {
      toaster.push(
        <Message type="error">
          Vui lòng kiểm tra lại thông tin đăng ký.
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Content>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100vh" }}
        >
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<Text size={20}>Đăng ký</Text>} bordered>
              <Form
                fluid
                model={model}
                formValue={formValue}
                onChange={onChange}
                onCheck={setFormError}
              >
                <Form.Group controlId="username">
                  <Form.ControlLabel>Tên đăng nhập</Form.ControlLabel>
                  <Form.Control name="username" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                  <Form.Control name="password" type="password" />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.ControlLabel>Xác nhận mật khẩu</Form.ControlLabel>
                  <Form.Control name="confirmPassword" type="password" />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control name="email" type="email" />
                </Form.Group>
                <Form.Group>
                  <Stack spacing={10}>
                    <Button appearance="primary" onClick={handleSubmit}>
                      Đăng ký
                    </Button>
                    <Button
                      appearance="primary"
                      color="orange"
                      onClick={handleLogin}
                    >
                      Đăng nhập
                    </Button>
                  </Stack>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default SignUpPage;
