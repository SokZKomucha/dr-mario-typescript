import { refreshRate, virusCount as startVirusCount } from "./configuration/config";
import { Game } from "./logic/Game";
import { MagnifyingGlass } from "./logic/MagnifyingGlass";

(async () => {

  const flask = document.querySelector<HTMLDivElement>("#flask")!;
  const pillCanvas = document.querySelector<HTMLDivElement>("#pill")!;

  const scoreContainer = document.querySelector<HTMLDivElement>("#score")!;
  const highscoreContainer = document.querySelector<HTMLDivElement>("#highscore")!;
  const virusCountContainer = document.querySelector<HTMLDivElement>("#virus-count")!;
  const endImage = document.querySelector<HTMLImageElement>("#end-image")!;
  const magnifyingGlassContainer = document.querySelector<HTMLDivElement>("#magnifying-glass")!;

  const game = new Game();
  const magnifyingGlass = new MagnifyingGlass();

  magnifyingGlassContainer.appendChild(magnifyingGlass.container);
  flask.append(game.gameCanvas);
  flask.append(game.animCanvas);
  pillCanvas.appendChild(game.pillCanvas);


  const numberToDigits = (number: number, padding = 0) => {
    const digits = Math.abs(number).toString().padStart(padding, "0").split("");
    const container = document.createElement("div");

    digits.forEach(e => {
      const image = document.createElement("img");
      image.setAttribute("src", `cyfry/${e}.png`);
      image.classList.add("digit");
      container.appendChild(image)
    });

    return container;
  }



  let score = 0;
  let highscore = 0;
  let virusCount = startVirusCount;
  let dancingVirusTick = 0;
  let gameLost = false;
  
  game.on("gameStart", () => {
    highscore = Number(localStorage.getItem("game.highscore")) ?? 0;

    const scoreDigits = numberToDigits(score, 7);
    scoreContainer.innerHTML = "";
    scoreContainer.appendChild(scoreDigits);
    
    const highscoreDigits = numberToDigits(highscore, 7);
    highscoreContainer.innerHTML = "";
    highscoreContainer.appendChild(highscoreDigits);
    
    const virusCountDigits = numberToDigits(virusCount, 2);
    virusCountContainer.innerHTML = "";
    virusCountContainer.appendChild(virusCountDigits);
  });

  game.on("virusRemove", (e) => {
    score += 100;
    virusCount--;

    const scoreDigits = numberToDigits(score, 7);
    scoreContainer.innerHTML = "";
    scoreContainer.appendChild(scoreDigits);

    const virusCountDigits = numberToDigits(virusCount, 2);
    virusCountContainer.innerHTML = "";
    virusCountContainer.appendChild(virusCountDigits);

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("game.highscore", highscore.toString());
      const highscoreDigits = numberToDigits(highscore, 7);
      highscoreContainer.innerHTML = "";
      highscoreContainer.appendChild(highscoreDigits);
    } 
  });

  game.on("gameLose", () => {
    endImage.src = "go.png";
    endImage.classList.remove("hidden");
    magnifyingGlass.setLaughing();
    document.querySelector("#freaky-mario")!.classList.remove("hidden");
    gameLost = true;
  });

  game.on("gameWin", () => {
    endImage.src = "sc.png";
    endImage.classList.remove("hidden");
  });

  game.on("frame", () => {
    dancingVirusTick = (dancingVirusTick + 1) % (refreshRate * 2);

    if (dancingVirusTick % (refreshRate / 4) !== 0) return;

    magnifyingGlass.nextFrame();

    // Dziwny hack, ale działa
    game.checkCellCrossings();
    game.applyGravity();

    if (dancingVirusTick !== 0 || gameLost) return;

    magnifyingGlass.nextPosition();

  });




  game.loadedImages = await game.preloadImages();
  await game.startGame();

})();