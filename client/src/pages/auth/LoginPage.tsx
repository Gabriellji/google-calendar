import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, SESSION_URL } from "../../constants/api-urls";
import { ClientRoute } from "../../constants/routes";
import Button from "../../components/Button";
import styled from "styled-components";
import { useApiRequest } from "../../hooks/useApi";
import Loader from "../../components/Loader";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const LoginButton = styled(Button)``;

const LoginPage = () => {
  const navigate = useNavigate();
  const { sendRequest, isLoading, error } = useApiRequest();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await sendRequest(SESSION_URL, {
          method: "GET",
        });

        if (response.status === 200) {
          navigate(ClientRoute.EVENTS);
        } else {
          navigate(ClientRoute.LOGIN);
        }
      } catch (error) {
        console.log("Not authenticated or error occurred:", error);
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LoginContainer>
      <LoginButton onClick={handleLogin}>Login with Google</LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
