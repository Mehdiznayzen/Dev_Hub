import PageShell from "@/components/dashboard/PageShell"; 

const TagsPage = () => { 
  return ( 
    <PageShell 
      active="Tags" 
      title="Tags" 
      subtitle="Explore topics and technologies from the developer community" 
      showAskButton={false}
      showSearch
    > 
      <div>TagsPage</div> 
    </PageShell> 
  ); 
}; 

export default TagsPage;