import PageShell from "@/components/dashboard/PageShell";

const ShowUsersPage = () => {
  return (
    <PageShell
      active="Users"
      title="Users"
      subtitle="Discover developers from the community"
      showSearch
      showAskButton={false}
    >
      <div>ShowUsersPage</div>
    </PageShell>
  );
};

export default ShowUsersPage;