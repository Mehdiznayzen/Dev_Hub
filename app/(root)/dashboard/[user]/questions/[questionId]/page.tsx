import QuestionDetails from "@/components/dashboard/QuestionDetails";

interface QuestionDetailsPageProps {
  params: Promise<{
    question: string;
    questionId: string;
  }>;
}

const QuestionDetailsPage = async ({ params }: QuestionDetailsPageProps) => {
  const { questionId } = await params;

  return (
    <QuestionDetails
      questionId={questionId}
    />
  );
};

export default QuestionDetailsPage;