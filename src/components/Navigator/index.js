import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useAuthentication } from "../../context/AuthenticationContext";
import { useMenu } from "../../context/MenuContext";

import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const NavigatorWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  line-height: 30px;
`;

const LinkWrapper = styled.div`
  float: left;
  margin: 0 10px;
`;

const LinkRightWrapper = styled.div`
  float: right;
  margin: 0 10px;
`;

export default function Navigator() {
  const navigate = useNavigate();
  const { authenticate, user, logoutRequest } = useAuthentication();
  const { menus, menuApiRequest } = useMenu();
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    menuApiRequest();

    const tmpMenus = menus.map((instanceObject) => ({
      ...instanceObject,
      command: () => {
        navigate(instanceObject.routeUrl);
      },
    }));
    setMenuList(tmpMenus);
  }, [menus]);

  const startTemplate = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );

  const endTemplate = (
    <>
      <div className="flex flex-column align">
        <span className="font-bold">
          {authenticate ? user.name + "(" + user.email + ")" : ""}
        </span>
        <Button
          icon="pi pi-fw pi-power-off"
          severity="danger"
          raised
          text
          size="sm"
          onClick={() => logoutRequest()}
        />
      </div>
    </>
  );

  return (
    <NavigatorWrapper>
      <div className="card">
        <Menubar model={menuList} start={startTemplate} end={endTemplate} />
      </div>
      {menuList.map((item, i) => (
        <LinkWrapper key={i}>
          <Link to={item.url}>{item.name}</Link>
        </LinkWrapper>
      ))}
    </NavigatorWrapper>
  );
}
