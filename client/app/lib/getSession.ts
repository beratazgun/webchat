import { cookies } from "next/headers";

const getSession = () => {
  const cookieStore = cookies();
  const ses = cookieStore.get("sesID");
  return ses;
};

export default getSession;
