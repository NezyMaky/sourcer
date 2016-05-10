import Field from './core/Field';
import Sourcer from './core/Sourcer';
import Utils from './core/Utils';
import TickEventListener from './core/TickEventListener';
import {FieldDump, ResultDump} from './core/Dump';

declare function postMessage(message: any): void;

function create(field: Field, source: SourcerSource, index: number) {
  "use strict";
  let side = (index % 2 === 0) ? -1 : 1;
  return new Sourcer(
    field, Utils.rand(80) + 160 * side, Utils.rand(160) + 80,
    source.ai, source.account, source.name, source.color);
}

onmessage = function(e) {
  var sources = e.data.sources as SourcerSource[];
  var idToIndex: { [key: number]: number } = {};
  var listener: TickEventListener = {
    onPreThink: function(sourcerId: number) {
      postMessage({
        command: "PreThink",
        index: idToIndex[sourcerId]
      });
    },
    onPostThink: function(sourcerId: number) {
      postMessage({
        command: "PostThink",
        index: idToIndex[sourcerId]
      });
    },
    onFrame: (field: FieldDump) => {
      postMessage({
        command: "Frame",
        field: field
      });
    },
    onFinished: (result: ResultDump) => {
      postMessage({
        command: "Finished",
        result: result
      });
    },
    onEndOfGame: () => {
      postMessage({
        command: "EndOfGame"
      });
    },
    onLog: (sourcerId: number, ...messages: any[]) => {
      console.log("onLog");
      postMessage({
        command: "Log",
        index: idToIndex[sourcerId],
        messages: messages
      });
    }
  };

  var field = new Field();
  sources.forEach((value, index) => {
    var sourcer = create(field, value, index);
    field.addSourcer(sourcer);
    idToIndex[sourcer.id] = index;
  });

  postMessage({
    command: "Players",
    players: field.players()
  });

  for (var i = 0; i < 2000 && !field.isFinished; i++) {
    field.tick(listener);
  }
};
