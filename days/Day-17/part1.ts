import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

class Cube3D {
  constructor(public x: number, public y: number, public z: number) {

  }

  toString() {
    return `${this.x}-${this.y}-${this.z}`;
  }

  translate(x: number, y: number, z: number) {
    this.x += x;
    this.y += y;
    this.z += z;
  }
}

export const executor: DayScriptExecutor = (input: string): string => {
  let cubeStates = new Map<string, boolean>();
  let startDimension = new Cube3D(0, 0, 0);
  let endDimension = new Cube3D(0, 0, 0);

  getInputLinesTrimAndFilterEmpty(input)
    .forEach((line, row, allRows) => line
      .split('')
      .forEach((stateSym, column, allColumns) => {
        cubeStates.set(new Cube3D(column, row, 0).toString(), stateSym === '#');

        if ((row === (allRows.length - 1)) && (column === (allColumns.length - 1))) {
          endDimension = new Cube3D(column, row, 0);
        }
      })
    );

  const totalCycles = 1;

  for (let i = 0; i < totalCycles; i++) {
    cubeStates = runCycle(startDimension, endDimension, cubeStates);
  }

  return `Total amount of active cubes are ${totalCycles} cycles: ${Array.from(cubeStates.values())
    .reduce((totalTrue, value) => value ? ++totalTrue : totalTrue, 0)}`
};

const runCycle = (start: Cube3D, end: Cube3D, states: Map<string, boolean>): Map<string, boolean> => {
  const newStates = new Map<string, boolean>();
  start.translate(-1, -1, -1);
  end.translate(-1, -1, -1);

  for (let z = start.z; z < end.z; z++) {
    for (let y = start.y; y < end.y; y++) {
      for (let x = start.x; x < end.x; x++) {
        const currentCube = new Cube3D(x, y, z);
        if (newStates.has(currentCube.toString()))
          newStates.set(currentCube.toString(), false);

        let currentCubeState = false;
        if (states.has(currentCube.toString())) {
          const currentCubeExistingState = states.get(currentCube.toString());
          if (currentCubeExistingState) currentCubeState = currentCubeExistingState;
        }

        const totalActiveNeighbours = getTotalActiveNeighbours(currentCube, start, end, states);
        if (currentCubeState) {
          // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
          newStates.set(currentCube.toString(),
            (totalActiveNeighbours === 2) || (totalActiveNeighbours === 3)
          );
        } else {
          // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
          newStates.set(currentCube.toString(),
            (totalActiveNeighbours === 3)
          );
        }
      }
    }
  }

  return newStates;
};

const getTotalActiveNeighbours = (cube: Cube3D, start: Cube3D, end: Cube3D, states: Map<string, boolean>): number => {
  let totalActive = 0;
  const minRelative = -1;
  const maxRelative = 2;

  for (let z = minRelative; z < maxRelative; z++) {
    for (let y = minRelative; y < maxRelative; y++) {
      for (let x = minRelative; x < maxRelative; x++) {
        const neighbourCube = new Cube3D(cube.x, cube.y, cube.z);
        neighbourCube.translate(x, y, z);

        if (!states.has(neighbourCube.toString())) continue;

        // In x range
        if ((neighbourCube.x < start.x) || (neighbourCube.x > end.x)) continue;
        // In y range
        if ((neighbourCube.y < start.y) || (neighbourCube.y > end.y)) continue;
        // In z range
        if ((neighbourCube.z < start.z) || (neighbourCube.z > end.z)) continue;
      }
    }
  }


  return totalActive;
};