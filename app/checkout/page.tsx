import FormWrap from "@/components/(formwraps)/formwrap";
import Container from "@/components/container";
import CheckOutClient from "./checkoutclient/checkoutclient";

const CheckOut = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient></CheckOutClient>
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckOut;
