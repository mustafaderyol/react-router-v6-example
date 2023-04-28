import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useAuthentication } from "../../context/AuthenticationContext";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

const LoginWrapper = styled.div`
  position: absolute;
  width: 400px;
  min-height: 160px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
  padding: 20px;
`;

export default function Login() {
  const { authenticate, loginErrorMessage, loginRequest } = useAuthentication();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (authenticate) {
      navigate("/dashboard");
    }
  }, [authenticate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest({ email: email, password: password });
  };

  return (
    <LoginWrapper>
      <div className="card flex justify-content-center">
        <Card title="Login" className="md:w-25rem">
          <form onSubmit={handleSubmit}>
            <table border={0}>
              <tr>
                <td>Email</td>
                <td>
                  <InputText
                    id="email"
                    className="p-inputtext-sm"
                    aria-describedby="email-help"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <InputText
                    id="password"
                    className="p-inputtext-sm"
                    aria-describedby="password-help"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button aria-label="Submit" label="Submit" />
                </td>
              </tr>
              {loginErrorMessage ? (
                <tr>
                  <td colSpan={2}>
                    <Tag severity="danger" value={loginErrorMessage}></Tag>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </table>
          </form>
        </Card>
      </div>
    </LoginWrapper>
  );
}
