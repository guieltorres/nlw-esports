import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "phosphor-react";
import { useState } from "react";

interface GameSelectorProps {
  gamesTitles: string[];
}

export function GameSelector(props: GameSelectorProps) {
  const [selectedGame, setSelectedGame] = useState<string | undefined>(
    undefined
  );
  return (
    <Select.Root value={selectedGame} onValueChange={setSelectedGame}>
      <Select.Trigger
        aria-label="Game name"
        className={`flex justify-between items-center bg-zinc-900 w-full py-3 px-4 rounded text-sm ${
          selectedGame ? "text-white" : "text-zinc-500"
        }  `}
      >
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <CaretDown size={20} className="text-zinc-400" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton className="flex items-center justify-center text-zinc-400">
            <CaretUp size={20} />
          </Select.ScrollUpButton>
          <Select.Viewport className="bg-zinc-900 p-2 rounded-lg shadow-lg">
            <Select.Group>
              {props.gamesTitles.map((gameTitle, i) => (
                <Select.Item
                  key={`${gameTitle}-${i}`}
                  value={gameTitle.toLowerCase()}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-zinc-500 font-medium focus:bg-zinc-700 focus:text-white"
                >
                  <Select.ItemText>{gameTitle} </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check size={20} className="text-zinc-400" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center text-zinc-400">
            <CaretDown size={20} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
