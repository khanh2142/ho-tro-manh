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
});

const LoginPage = () => {
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const toaster = useToaster();

  const onChange = (formValue) => {
    setFormValue(formValue);
  };

  const handleSubmit = () => {
    if (!formError.username && !formError.password) {
      // Giả sử đây là thông tin người dùng hợp lệ
      const user = {
        username: formValue.username,
        fullName: faker.person.fullName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      };
      login(user);
      navigate("/");
    } else {
      toaster.push(
        <Message type="error">
          Vui lòng kiểm tra lại thông tin đăng nhập.
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

  const handleSignUp = () => {
    navigate("/signUp");
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
            <Panel header={<Text size={20}>Đăng nhập</Text>} bordered>
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
                <Form.Group>
                  <Stack spacing={10}>
                    <Button appearance="primary" onClick={handleSubmit}>
                      Đăng nhập
                    </Button>
                    <Button
                      appearance="primary"
                      color="orange"
                      onClick={handleSignUp}
                    >
                      Đăng ký
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

export default LoginPage;
