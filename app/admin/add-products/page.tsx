import Container from "@/components/container";
import AddProductForm from "./AddProductForm";
import FormWrap from "@/components/(formwraps)/formwrap";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/components/NullData";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Sorry, you have no access to this" />;
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
