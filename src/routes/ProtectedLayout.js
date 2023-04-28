import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { useAuthentication } from "../context/AuthenticationContext";
import Navigator from "../components/Navigator";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ProtectedLayout = () => {
  const { authenticate } = useAuthentication();

  if (!authenticate) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Navigator />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </React.Fragment>
  );
};
