import { matched } from "@/constants";
import IssueCard from "./issueCard";

export default function Issues() {
  return (
    <div className="lg:max-h-[calc(100vh-106px)] lg:overflow-scroll lg:col-span-3 space-y-2">
      <div className="text-sm  font-medium text-muted-foreground">{`Found ${matched?.length} matched issues`}</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {matched.map((m, i) => (
          <IssueCard key={i} issue={m} />
        ))}
      </div>
    </div>
  );
}
