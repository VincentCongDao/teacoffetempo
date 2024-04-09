import Container from "@/components/container";
import CartClient from "../cartclient/page";
import { getCurrentUser } from "@/action/getCurrentUser";

const Cart = async () => {
  const currentUser = getCurrentUser();
  return (
    <div>
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Cart;
