import { Question } from "@/data";
import { QuestionCard } from "./QuestionCard";


const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      {
        questions.map((question, i) => (
            <QuestionCard 
                key={question.id} 
                question={question} 
                index={i} 
            />
        ))
      }
    </div>
  );
}

export default QuestionList;