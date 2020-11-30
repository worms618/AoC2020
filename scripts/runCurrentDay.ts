import { RunDayAndPart } from "../src/day/day.runner.ts";

const curDate = new Date(Date.now());
const dayOfMonth = curDate.getDate();

RunDayAndPart(dayOfMonth, 1);
RunDayAndPart(dayOfMonth, 2);