import { Form } from "react-router-dom";
import { activateEmail } from "../../services/apiAuth";

function ActivateAccount() {
  return (
    <div>
      <Form method="POST">
        <input type="text" name="activationCode" className="input-register" />
      </Form>
    </div>
  );
}

export default ActivateAccount;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const token = localStorage.getItem("activationToken");

  console.log(token, data.activationCode);

  const res = await activateEmail(data, token);

  return res;
}
