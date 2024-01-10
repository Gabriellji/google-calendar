import { ProtectedRoute } from "../../components/ProtectedRoute";
import EventsTable from "./components/EventsTable";
import { useApiRequest } from "../../hooks/useApi";
import { LOGOUT_URL } from "../../constants/api-urls";
import styled from "styled-components";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { ClientRoute } from "../../constants/routes";

const EventsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

const LogoutContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

const LogoutButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid #f44336;
  }
`;

const EventsPage = () => {
  const { sendRequest, isLoading, error } = useApiRequest();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await sendRequest(LOGOUT_URL, {
      method: "POST",
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.removeItem("accessToken");
      navigate(ClientRoute.LOGIN);
    }
  };
  return (
    <EventsPageContainer>
      <LogoutContainer>
        <LogoutButton type="button" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </LogoutContainer>
      <EventsTable />
    </EventsPageContainer>
  );
};

export default ProtectedRoute(EventsPage);
