import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

function Test() {
  const { logOutUser } = useContext(AuthContext);
  const callTest = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch("http://localhost:5005/api/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const finalRes = await res.json();
    console.log(finalRes);
  };
  return <button onClick={callTest}>Log out</button>;
}

export default Test;
