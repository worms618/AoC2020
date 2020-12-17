export type PocketDimension3D = Map<number, boolean[][]>;

import { getInputLinesTrimAndFilterEmpty, mapToInteger } from "../shared.ts";

const STATE_ACTIVE_SYM = '#';
const STATE_INACTIVE_SYM = '.';

export const getInitialPocketDimension = (input: string): PocketDimension3D => {
  const layerZero: boolean[][] = getInputLinesTrimAndFilterEmpty(input)
    .map(rawStates => Array.from(rawStates).map(rawState => rawState === STATE_ACTIVE_SYM));

  return new Map<number, boolean[][]>([
    [0, layerZero]
  ]);
}

export const pocketDimensionToString = (pdim: PocketDimension3D): string[] => {
  const lines: {layer: number, lines: string[]}[] = [];

  for (const [layer, cubes] of pdim.entries()) {
    const layerLines: string[] = [];

    layerLines.push(`z=${layer.toString()}`)
    cubes
      .map(states => states.map(state => state ? STATE_ACTIVE_SYM : STATE_INACTIVE_SYM))
      .map(states => states.join(''))
      .forEach(states => layerLines.push(states));
    
    lines.push({
      layer,
      lines: layerLines
    })
  }

  return lines
    .sort((a, b) => a.layer - b.layer)
    .map(lwl => lwl.lines)
    .reduce((all, lines) => all.concat(lines));
}

export const printPocketDimension = (pdim: PocketDimension3D): void => {
  console.log(pocketDimensionToString(pdim).join('\n'));
}

const getEmptyLayerStates = (template: boolean[][]): boolean[][] => {
  return template.map(statesRow => Array.from(statesRow).map(() => false));
}

export const runCycle = (pDim: PocketDimension3D): PocketDimension3D => {
  if (pDim.size <= 0) throw new Error(`Cannot cycle through empty dimension`);

  let templateStates: boolean[][] = [];
  const emptyLayer = () => getEmptyLayerStates(templateStates);

  for (const states of pDim.values()) {
    templateStates = states;
    break;
  }

  const pDimWithEnoughLayers = new Map<number, boolean[][]>(pDim);

  const layersToAccess: Set<number> = new Set<number>();
  for (const layerNr of pDimWithEnoughLayers.keys()) {
    layersToAccess
      .add(layerNr - 1)
      .add(layerNr + 1);
  }

  layersToAccess.forEach(layerToAccess => {
    if (!pDimWithEnoughLayers.has(layerToAccess))
      pDimWithEnoughLayers.set(layerToAccess, emptyLayer())
  });

  return runCycleWithoutCreateNewLayers(pDimWithEnoughLayers);
}

const runCycleWithoutCreateNewLayers = (pDim: PocketDimension3D): PocketDimension3D => {
  const newPDim = new Map<number, boolean[][]>(pDim);

  return newPDim;
}