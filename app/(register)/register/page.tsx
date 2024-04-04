import FormWrap from "@/components/(formwraps)/formwrap";
import Container from "@/components/container";
import RegisterForm from "../_registerform/registerform";
import { getCurrentUser } from "@/action/getCurrentUser";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
