import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-center text-red-600 mt-20">⚠️ You must sign in first!</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">📊 Dashboard</h2>
      <p className="mt-4 text-gray-700">Welcome, {session.user?.name}</p>
    </div>
  );
}
