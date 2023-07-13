import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const navigate = useNavigate();

  if (!props.isLoggedIn) {
    navigate("/");
  }
  return props.children;
}
