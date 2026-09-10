import PageShell from "@/components/dashboard/PageShell"

const MyQuestionsPage = () => {
  return (
    <PageShell
      active="My Questions"
      title="My Questions"
      subtitle="Manage and track the questions you've asked"
      showAskButton
      showSearch
      searchPlaceholder="Search my questions..."
    >
      <div>
        MyQuestionsPage
      </div>
    </PageShell>
  )
}

export default MyQuestionsPage