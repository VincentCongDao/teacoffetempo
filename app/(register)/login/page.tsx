import FormWrap from "@/components/(formwraps)/formwrap";
import Container from "@/components/container";
import LoginForm from "./_loginform/loginform";
import { getCurrentUser } from "@/action/getCurrentUser";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Login;
