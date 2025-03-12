import { auth, currentUser } from "@clerk/nextjs/server";

const DashboardPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  const user = await currentUser();

  console.log(user);

  return <div>Hello, {user.firstName}</div>;
};

export default DashboardPage;
