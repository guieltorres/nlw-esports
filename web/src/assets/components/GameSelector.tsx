import * as Select from "@radix-ui/react-select";
import axios from "axios";
import { CaretDown, CaretUp, Check } from "phosphor-react";
import { useEffect, useState } from "react";

interface Game {
  id: string;
  title: string;
}

export function GameSelector() {
  const [selectedGame, setSelectedGame] = useState<string | undefined>(
    undefined
  );
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <Select.Root
      name="game"
      value={selectedGame}
      onValueChange={setSelectedGame}
    >
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
              {games.map((game) => (
                <Select.Item
                  key={game.id}
                  value={game.id.toLowerCase()}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-zinc-500 font-medium focus:bg-zinc-700 focus:text-white"
                >
                  <Select.ItemText>{game.title} </Select.ItemText>
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
