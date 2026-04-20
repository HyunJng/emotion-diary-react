import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { UserContext } from "../App";
import "./Login.css";

const Register = () => {
  const nav = useNavigate();
  const { register } = useContext(UserContext);
  const [input, setInput] = useState({ nickname: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    if (!input.nickname || !input.email || !input.password) {
      setError("모든 항목을 입력해주세요");
      return;
    }
    try {
      await register(input.email, input.password, input.nickname);
      nav("/", { replace: true });
    } catch {
      setError("회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다");
    }
  };

  return (
    <div>
      <Header
        title="회원가입"
        leftChild={<button className="back_btn" onClick={() => nav(-1)}>{"< 뒤로"}</button>}
      />
      <div className="AuthForm">
        <section>
          <h4>닉네임</h4>
          <input
            type="text"
            name="nickname"
            value={input.nickname}
            onChange={onChange}
            placeholder="닉네임 입력"
          />
        </section>
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
          <Button text="가입하기" type="POSITIVE" onClick={onSubmit} />
        </section>
        <p className="link_section">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
