import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { UserContext } from "../App";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const { login } = useContext(UserContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    if (!input.email || !input.password) {
      setError("이메일과 비밀번호를 입력해주세요");
      return;
    }
    try {
      await login(input.email, input.password);
      nav("/", { replace: true });
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다");
    }
  };

  return (
    <div>
      <Header title="감정 일기" />
      <div className="AuthForm">
        <section>
          <h4>이메일</h4>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={onChange}
            placeholder="example@email.com"
          />
        </section>
        <section>
          <h4>비밀번호</h4>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={onChange}
            placeholder="비밀번호 입력"
          />
        </section>
        {error && <p className="error_msg">{error}</p>}
        <section className="button_section">
          <Button text="로그인" type="POSITIVE" onClick={onSubmit} />
        </section>
        <p className="link_section">
          아직 계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
