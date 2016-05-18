export var escape = `
let current = 150;
return function(controller) {
  if(controller.frame() % 32 === 0) {
    current = Math.random() * 100 + 50;
  }

  if(controller.frame() % 64 === 0) {
    // ランダムを使い、２分の１の確立でターンする(Math.random() は 0 〜 1 のランダムな値を取得できる)
    if (Math.random() < 0.5) {
      controller.turn();
    }
  }
  if (controller.altitude() < current) {
    controller.ascent();
  }
  if (controller.frame() % 4 === 0) {
    controller.ahead();
  }
};
`;