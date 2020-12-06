import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { createGroupsFromInput } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const groups = createGroupsFromInput(input);
  
  const groupsQuestionsAnsweredYes = groups.reduce<Set<string>[]>((allGroups, currentGroup) => {
    const groupQuestionsAnsweredYes: Set<string> = new Set<string>();

    for (const answer of currentGroup) {
      Array.from(answer).forEach(char => groupQuestionsAnsweredYes.add(char));
    }

    allGroups.push(groupQuestionsAnsweredYes);
    
    return allGroups;
  }, []);

  const totalNumberAnswerdYes = groupsQuestionsAnsweredYes.reduce<number>((currTotal, setAnsweredYes) => {
    currTotal += setAnsweredYes.size;
    return currTotal;
  }, 0);

  return `Total answered yes combined: ${totalNumberAnswerdYes}`;
};