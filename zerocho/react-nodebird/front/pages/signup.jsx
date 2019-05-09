import React, { useState, useCallback  } from "react";

import { Form, Input, Checkbox, Button } from "antd";

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(
      e => {
        const { value } = e.target;

        setter(value);
      },
      []
  );
  return [value, handler];
};

const SignUp = () => {
  // Custom Hooks


  const [id, onChangeId] = useInput("");
  const [nick, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");

  // const [id, setId] = useState("");
  //const [nick, setNick] = useState("");
  //const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }

      // eslint-disable-next-line no-console
      console.log({
        id,
        nick,
        password,
        passwordCheck,
        term
      });
    },
    [password, passwordCheck, term]
  );

  // const onChangeId = e => {
  //   setId(e.target.value);
  // };

  // const onChangeNick = e => {
  //   setNick(e.target.value);
  // };

  // const onChangePassword = e => {
  //   setPassword(e.target.value);
  // };

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password, passwordCheck]
  );

  const onChangeTerm = useCallback(
    e => {
      setTerm(e.target.checked);
    },
    [term]
  );

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" required value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            required
            value={nick}
            onChange={onChangeNick}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            required
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input
            name="user-password-check"
            required
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            제로초 말을 잘 들을 것을 동의합니다.
          </Checkbox>
          {termError && (
            <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignUp;