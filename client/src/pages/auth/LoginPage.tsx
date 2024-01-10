import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants/api-urls";
import { ClientRoute } from "../../constants/routes";
import Button from "../../components/Button";
import styled from "styled-components";

const LoginContainer = styled.div`
  	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f7f7f7;
`;

const LoginButton = styled(Button)``


const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate(ClientRoute.EVENTS);
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };

  return (
	<LoginContainer>
	<LoginButton onClick={handleLogin} >Login with Google</LoginButton>
  </LoginContainer>
  );
};

export default LoginPage;
