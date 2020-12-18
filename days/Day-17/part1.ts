import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

interface ICube3D {
  x: number,
  y: number,
  z: number
};

const Cube3D = (x: number = 0, y: number = 0, z: number = 0): ICube3D => ({
  x, y, z
});

const cubeHash = (cube: ICube3D): string => `${cube.x},${cube.y},${cube.z}`;

const cubeTranslate = (cube: ICube3D, x: number, y: number, z: number) => {
  cube.x += x;
  cube.y += y;
  cube.z += z;
  return cube;
};

export const executor: DayScriptExecutor = (input: string): string => {
  let allStates: Map<string, boolean> = new Map<string, boolean>();
  let start = Cube3D(0, 0, 0);
  let end = Cube3D(0, 0, 0);

  getInputLinesTrimAndFilterEmpty(input)
    .map((line, y, allInRow) => Array.from(line).map((char, x, allInColumn) => {
      allStates.set(cubeHash(Cube3D(x, y, 0)), char === '#');

      if (((allInRow.length - 1) === y) && (allInColumn.length - 1) === x)
        end = Cube3D(x, y, 0);
    }));

  const amountOfCycles = 6;

  for (let i = 0; i < amountOfCycles; i++) {
    start = cubeTranslate(start, -1, -1, -1);
    end = cubeTranslate(end, 1, 1, 1);

    allStates = runCycle(start, end, allStates);
  }

  let totalCubesLeftActive = 0;
  for (const state of allStates.values()) {
    if (state) totalCubesLeftActive++;
  }

  return `After ${amountOfCycles} cycles are ${totalCubesLeftActive} left active`;
};

const runCycle = (start: ICube3D, end: ICube3D, states: Map<string, boolean>): Map<string, boolean> => {
  const cycleStates = new Map<string, boolean>();

  for (let x = start.x; x <= end.x; x++) {
    for (let y = start.y; y <= end.y; y++) {
      for (let z = start.z; z <= end.z; z++) {
        const currCube = Cube3D(x, y, z);
        const currHashCube = cubeHash(currCube);
        let currCubeState = false;

        if (!cycleStates.has(currHashCube)) {
          cycleStates.set(currHashCube, currCubeState);
        }

        const currCubeStateExisting = states.get(currHashCube);
        if (currCubeStateExisting)
          currCubeState = currCubeStateExisting;
        else
          currCubeState = false;

        const neighbourStates = getNeighbourStates(currCube, start, end, states);
        // Filter true values and count amount left
        const totalActiveNeighbours = neighbourStates.filter(state => state).length;

        if (currCubeState) {
          const twoOrThreeNeighboursAreActive = (totalActiveNeighbours === 2) || (totalActiveNeighbours === 3);
          cycleStates.set(currHashCube, twoOrThreeNeighboursAreActive);
        } else {
          const threeNeightboursAreActive = (totalActiveNeighbours === 3);
          cycleStates.set(currHashCube, threeNeightboursAreActive);
        }
      }
    }
  }

  return cycleStates;
};

const getNeighbourStates = (cube: ICube3D, start: ICube3D, end: ICube3D, states: Map<string, boolean>): boolean[] => {
  const neighborStates: boolean[] = [];

  // -1, 0, 1
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      for (let z = -1; z < 2; z++) {
        const neighbourCube = Cube3D(x + cube.x, y + cube.y, z + cube.z);
        const neighbourHashCube = cubeHash(neighbourCube);

        if (states.has(neighbourHashCube)) {
          const neighbourExistingState = states.get(neighbourHashCube);

          if (neighbourExistingState !== undefined)
            neighborStates.push(neighbourExistingState)
          else
            throw new Error(`States has ${neighbourHashCube} but value after get is undefined`);
        } else {
          const neighbourCubeInRange = cubeInRange(neighbourCube, start, end);

          if (neighbourCubeInRange)
            neighborStates.push(false);
        }
      }
    }
  }

  return neighborStates;
};

const cubeInRange = (cube: ICube3D, min: ICube3D, max: ICube3D): boolean => {
  const { x, y, z } = cube;

  return ((x >= min.x) && (x <= max.x)) &&
    ((y >= min.y) && (y <= max.y)) &&
    ((z >= min.z) && (z <= max.z))
};