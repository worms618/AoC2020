export const getTurnNthSpokenNumber = (startingNumbers: number[], numberSpokenAtTurn: number): number => {  
  const numRegister = new Map<number, number[]>(
    startingNumbers.map((num, index) => [
      num, [index + 1]
    ])
  );

  //Turns are NOT zero based
  let turns = startingNumbers.length + 1;
  let lastNumberSpoken = startingNumbers[startingNumbers.length - 1];
  let numberToSpeak = -1;

  while (turns <= numberSpokenAtTurn) {
    console.log('turn', turns);
    const turnsSpokenLNS = numRegister.get(lastNumberSpoken);

    if (turnsSpokenLNS === undefined) throw new Error(`Something went wrong in turn: ${turns} for last number spoken: ${lastNumberSpoken}`)

    if (turnsSpokenLNS.length === 1) {
      numberToSpeak = 0
    }
    else {
      const [mostRecent, BeforeMostRecent] = turnsSpokenLNS;
      numberToSpeak = mostRecent - BeforeMostRecent;
    }

    if (numRegister.has(numberToSpeak)) {
      const turnsSpokenNTS = numRegister.get(numberToSpeak);

      if (turnsSpokenNTS === undefined) throw new Error(`Something went wrong in turn: ${turns} for last number spoken: ${lastNumberSpoken}`)

      numRegister.set(numberToSpeak, [turns, turnsSpokenNTS[0]]);
    } else {
      numRegister.set(numberToSpeak, [turns]);
    }

    lastNumberSpoken = numberToSpeak;
    turns++;
  };

  return numberToSpeak;
}