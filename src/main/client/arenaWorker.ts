import Field from '../core/Field';
import Sourcer from '../core/Sourcer';
import Utils from '../core/Utils';
import TickEventListener from '../core/TickEventListener';
import { PlayersDump, FieldDump, ResultDump } from '../core/Dump';
import ExposedScriptLoader from '../core/ExposedScriptLoader';

export interface PlayerInfo {
  name: string;
  color: string;
  ai: string;
}

export interface InitialParameter {
  isDemo: boolean;
  sources: PlayerInfo[];
}

export type Data = NextCommand | PlayersCommand | PreThinkCommand | PostThinkCommand | FinishedCommand | EndOfGameCommand | LogCommand;

interface NextCommand {
  command: 'Next';
  issuedId: number;
}

interface PlayersCommand {
  command: 'Players';
  players: PlayersDump;
}

interface PreThinkCommand {
  command: 'PreThink';
  id: number;
}

interface PostThinkCommand {
  command: 'PostThink';
  id: number;
  loadedFrame: number;
}

interface FinishedCommand {
  command: 'Finished';
  result: ResultDump;
}

interface EndOfGameCommand {
  command: 'EndOfGame';
  frames: FieldDump[];
}

interface LogCommand {
  command: 'Log';
  id: number;
  messages: any[];
}

declare function postMessage(message: Data): void;

let issueId = 0;
const issue = () => issueId++;
const callbacks: { [id: number]: () => void; } = {};

onmessage = ({ data }) => {
  if (data.issuedId !== undefined) {
    callbacks[data.issuedId]();
    delete callbacks[data.issuedId];
    return;
  }
  const initialParameter = data as InitialParameter;
  const isDemo = initialParameter.isDemo as boolean;
  const sources = initialParameter.sources as SourcerSource[];
  const frames: FieldDump[] = [];
  const listener: TickEventListener = {
    onImmediate: (callback: () => void) => {
      const issuedId = issue();
      callbacks[issuedId] = callback;
      postMessage({
        issuedId,
        command: 'Next'
      });
    },
    onPreThink: (sourcerId: number) => {
      postMessage({
        command: 'PreThink',
        id: sourcerId
      });
    },
    onPostThink: (sourcerId: number) => {
      postMessage({
        command: 'PostThink',
        id: sourcerId,
        loadedFrame: frames.length
      });
    },
    onFrame: (fieldDump: FieldDump) => {
      frames.push(fieldDump);
    },
    onFinished: (result: ResultDump) => {
      postMessage({
        result,
        command: 'Finished'
      });
    },
    onEndOfGame: () => {
      postMessage({
        frames,
        command: 'EndOfGame'
      });
    },
    onLog: (sourcerId: number, ...messages: any[]) => {
      console.log('onLog');
      postMessage({
        messages,
        command: 'Log',
        id: sourcerId
      });
    }
  };

  const field = new Field(new ExposedScriptLoader(), isDemo);
  sources.forEach((value, index) => {
    field.registerSourcer(value.ai, value.account, value.name, value.color);
  });

  postMessage({
    command: 'Players',
    players: field.players()
  });

  setTimeout(() => {
    field.compile(listener, () => {
      let count = 0;
      const next = () => {
        field.tick(listener, () => {
          if (count < 10000 && !field.isFinished) {
            count++;
            next();
          }
        });
      };
      next();
    });
  }, 0);
};