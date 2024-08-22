// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  return (
    <div>
      {/* <Logo /> */}
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  return (
    <div className="login-form">
      <p className="hi">Hi ,welcome</p>
      <p>Enter your e-mail and passward</p>

      <div className="inp">
        <label className="lab">E-mail</label>

        <input className="form" type="text" placeholder="📧e-mail" />
      </div>
      <div className="inp">
        <label className="lab">Passward</label>

        <input className="form" type="text" placeholder="🔒passward 1234" />
      </div>
      <div>
        <input type="checkbox" className="checkbox" />
        <label>Remember me</label>
      </div>
      <a href="#">Forget your passward?</a>
      <button className="btn">Login</button>
      <p>Not register yet?</p>
      <a href="#">Create an Account</a>
    </div>
  );
}

// function Logo() {
//   return (
//     <div className="logo">
//       <p className="pi">Pichat</p>
//       <button className="btn1">📞conect us</button>
//     </div>
//   );
// }
export default Login;
