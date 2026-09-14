import UserDetails from "@/components/dashboard/UserDetails";

interface PageProps {
  params: Promise<{
    user: string;
    id: string;
  }>;
}

const UserDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  
  return <UserDetails userId={id} />;
};

export default UserDetailsPage;