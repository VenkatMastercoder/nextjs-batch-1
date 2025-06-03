import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

const User = async () => {
  const data = await getServerSession(authOption);
  return (
    <>
      User Data [ Server Side ]
      <br />
      email : {data.user.email}
    </>
  );
};

export default User;
