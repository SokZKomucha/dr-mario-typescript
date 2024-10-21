import { EventEmitter } from "./EventEmitter";
import { animationFrames } from "../configuration/animationFrames";
import { Colors, colors } from "../configuration/colors";
import { refreshRate, virusCount } from "../configuration/config";
import { textureMappings } from "../configuration/textureMappings";
import { BoardAnimation } from "./BoardAnimation";
import { Cell } from "./Cell";
import { Pill } from "./Pill";
import { Position } from "./Position";

type EventCallback<T extends any> = (callback: T) => void;

type EventMap = {
  animationRender: void,  // done
  cellFall: Cell,         // done
  cellRemove: Cell,       // done
  frame: void,            // done
  gameEnd: void,          // done
  gameLose: void,         // done
  gameStart: void,        // done
  gameRender: void,       // done?
  gameWin: void,          // done
  pillAbsorb: Cell[],     // done
  pillCreate: Pill,       // done
  tick: void,             // done
  virusCreate: Cell,      // done
  virusRemove: Cell,      // done
}

export class Game {
  private readonly columnCount = 8;
  private readonly rowCount = 16;
  private readonly tileSize = 16;
  // public readonly virusCount = 78;

  public loadedImages: HTMLImageElement[] = [];  // Do not remove!
  private eventEmitter = new EventEmitter<EventMap>();
  private requestAnimationFrameId = 0;

  public animations: BoardAnimation[] = [];
  public animCanvas: HTMLCanvasElement;
  public animContext: CanvasRenderingContext2D;
  public gameCanvas: HTMLCanvasElement;
  public gameContext: CanvasRenderingContext2D;
  public pillCanvas: HTMLCanvasElement;
  public pillContext: CanvasRenderingContext2D;
  public pillCanvasTextures: { position: Position, texture: string }[] = [];
  public running: boolean = false;
  public cells: Cell[] = [];
  public pill?: Pill;
  public pillIsBeingCreated = false;
  public nextPill?: Pill;

  public constructor() {
    this.gameCanvas = document.createElement("canvas");
    this.gameCanvas.width = this.tileSize * this.columnCount;
    this.gameCanvas.height = this.tileSize * this.rowCount;
    this.gameContext = this.gameCanvas.getContext("2d")!;

    this.animCanvas = document.createElement("canvas");
    this.animCanvas.width = this.tileSize * this.columnCount;
    this.animCanvas.height = this.tileSize * this.rowCount;
    this.animContext = this.animCanvas.getContext("2d")!;

    this.pillCanvas = document.createElement("canvas");
    this.pillCanvas.width = this.tileSize * 12;
    this.pillCanvas.height = this.tileSize * 8;
    this.pillContext = this.pillCanvas.getContext("2d")!;

    // jezu jestem kurwa geniuszem
    // Obrazki się ładują przed grą!!!!!!!!!!
    // this.preloadImages().then(images => {
    //   this.loadedImages = images;
    //   this.startGame();
    // });

    document.addEventListener("keydown", (keydownEvent) => {

      if (!this.running) {
        return;
      }

      if (!this.pill && this.nextPill) {
        switch (keydownEvent.key) {
          case "w": {
            this.nextPill.rotate("left")
            break;
          }
          case "Shift": {
            this.nextPill.rotate("right");
            break;
          }
        }
        this.renderPillCanvas();
      }

      if (!this.pill) {
        return;
      }

      switch (keydownEvent.key) {
        case "a": {
          if (!this.checkMoveCollisions(-1, 0)) return;
          this.pill?.move(-1, 0);
          break;
        }
        case "s": {
          if (!this.checkMoveCollisions(0, 1)) return;
          this.pill?.move(0, 1);
          break;
        }
        case "d": {
          if (!this.checkMoveCollisions(1, 0)) return;
          this.pill?.move(1, 0);
          break;
        }
        case "w": {
          if (!this.checkRotateCollisions()) return;
          this.pill.rotate("left");
          break;
        }
        case "Shift": {
          if (!this.checkRotateCollisions()) return;
          this.pill?.rotate("right");
          break;
        }
      }

      this.renderGame();
      this.renderPillCanvas();
    });
  }

  private absorbPill() {
    this.pill!.Cells.forEach(e => this.cells.push(e));

    if (Math.min(...this.pill!.Cells.map(e => e.position.y)) === -1) {
      this.emit("gameLose", undefined);
      this.finishGame();
    }

    this.emit("pillAbsorb", this.pill!.Cells);
    this.pill = undefined;
  }

  private async createPill() {

    const sleepTime = 20;
    const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));
    


    if (!this.running) return;
    if (this.pillIsBeingCreated) return;
    this.pillIsBeingCreated = true;



    



    
    // Zamknijcie mnie w psychiatryku
    {
      this.pillCanvasTextures.length = 0;
      this.pillCanvasTextures.push({ position: new Position(11, 4), texture: "up_1" })
      this.pillCanvasTextures.push({ position: new Position(11, 5), texture: "up_2" })
      this.pillCanvasTextures.push({ position: new Position(11, 6), texture: "up_3" })

      this.renderPillCanvas();
      await sleep(sleepTime);
      
      
      this.nextPill?.rotate("left");
      this.renderPillCanvas();
      await sleep(sleepTime);
      
      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, -1)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.pillCanvasTextures.length = 0;
      this.pillCanvasTextures.push({ position: new Position(10, 5), texture: "middle11" })
      this.pillCanvasTextures.push({ position: new Position(11, 5), texture: "middle12" })
      this.pillCanvasTextures.push({ position: new Position(10, 6), texture: "middle21" })
      this.pillCanvasTextures.push({ position: new Position(11, 6), texture: "middle22" })
      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, -1)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);
      
      this.pillCanvasTextures.length = 0;
      this.pillCanvasTextures.push({ position: new Position(11, 6), texture: "down_1" })
      this.pillCanvasTextures.push({ position: new Position(11, 7), texture: "down_2" })
      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 1)
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left")
      this.renderPillCanvas();
      await sleep(sleepTime);

      this.nextPill?.rotate("left");
      this.nextPill?.move(-1, 0)
      this.renderPillCanvas();
      await sleep(sleepTime * 3);

      this.nextPill?.move(0, 1)
      this.renderPillCanvas();
      await sleep(sleepTime * 3);

      this.nextPill?.move(0, 1)
      this.renderPillCanvas();
      await sleep(sleepTime * 3);

      this.nextPill?.move(0, 1)
      this.renderPillCanvas();
      await sleep(sleepTime * 3);
    }


  







    if (this.cells.find(e => e.position.compare(new Position(3, 0)))) {
      this.emit("gameLose", undefined);
      this.finishGame();
      return;
    }

    if (this.nextPill) {
      this.pill = new Pill(
        new Position(3, 0),
        this.nextPill.cellMiddle.color,
        this.nextPill.cellSide.color
      );
      this.pill.setRotation(this.nextPill.rotation);
    } else {
      this.pill = new Pill(
        new Position(10, 3),
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)]
      );
    }

    this.nextPill = new Pill(
      new Position(10, 3),
      colors[Math.floor(Math.random() * colors.length)],
      colors[Math.floor(Math.random() * colors.length)]
    );

    this.pillCanvasTextures.length = 0;
    this.pillCanvasTextures.push({ position: new Position(11, 4), texture: "up_1" })
    this.pillCanvasTextures.push({ position: new Position(11, 5), texture: "up_2" })
    this.pillCanvasTextures.push({ position: new Position(11, 6), texture: "up_3" })

    this.emit("pillCreate", this.pill);
    this.renderGame();
    this.renderPillCanvas();
    this.pillIsBeingCreated = false;
  }

  private createVirus(color: Colors) {
    const position = new Position(
      Math.floor(Math.random() * this.columnCount),
      Math.floor(Math.random() * (this.rowCount - 6)) + 6
    );

    if (this.cells.some(e => e.position.compare(position))) {
      return false;
    }

    const cell = new Cell(position, color);
    cell.type = "virus";
    this.cells.push(cell);
    this.animations.push(new BoardAnimation(animationFrames.get(`${cell.color}_v`)!, cell.position, true));
    this.emit("virusCreate", cell);
    return true;
  }



  private checkMoveCollisions(dx: number, dy: number) {

    const pillOccupiedCells = this.pill!.Cells.map(e => {
      return new Position(e.position.x + dx, e.position.y + dy);
    });

    if (pillOccupiedCells.some(e => e.x === -1 || e.x === this.columnCount)) {
      return false;
    } else if (![3, 4].includes(dx + this.pill!.cellMiddle.position.x) && Math.min(...pillOccupiedCells.map(e => e.y)) === -1 && [0, 2].includes(this.pill!.rotation)) {
      return false;
    } else if (pillOccupiedCells.some(e => e.y === this.rowCount)) {
      this.absorbPill();
      this.checkCellCrossings();
      this.createPill();
      return false;
    } else if (!dy && this.cells.some(e => pillOccupiedCells.some(f => e.position.compare(f)))) {
      return false;
    } else if (dy && this.cells.some(e => pillOccupiedCells.some(f => e.position.compare(f)))) {
      this.absorbPill();
      this.checkCellCrossings();
      this.createPill();
      return false;
    }

    // returna w async wrzucić. Wszystko kurwa async. Jak ja tego kurwa nienawidzę.

    return true;
  }



  private checkRotateCollisions() {
    const pillOccupiedCellMiddle = this.pill!.cellMiddle.position;

    if (this.pill!.rotation === 0) {
      if (this.cells.some(e => pillOccupiedCellMiddle.x + 1 === e.position.x && pillOccupiedCellMiddle.y === e.position.y))
        return false;
    } else if (this.pill!.rotation === 1) {
      if (this.cells.some(e => pillOccupiedCellMiddle.x === e.position.x && pillOccupiedCellMiddle.y - 1 === e.position.y))
        return false;
    } else if (this.pill!.rotation === 2) {
      if (this.cells.some(e => pillOccupiedCellMiddle.x + 1 === e.position.x && pillOccupiedCellMiddle.y + 1 === e.position.y))
        return false;
    } else if (this.pill!.rotation === 3) {
      if (this.cells.some(e => pillOccupiedCellMiddle.x - 1 === e.position.x && pillOccupiedCellMiddle.y - 1 === e.position.y))
        return false;
    }

    if ([0, 2].includes(this.pill!.rotation) && pillOccupiedCellMiddle.x === this.columnCount - 1) {
      return false;
    }

    if (![3, 4].includes(pillOccupiedCellMiddle.x) && [1, 3].includes(this.pill!.rotation) && pillOccupiedCellMiddle.y === 0) {
      return false;
    }

    return true;
  }

  public async checkCellCrossings() {
    const cellsToRemove: Set<Cell> = new Set();

    const markCellsForRemoval = (sequence: Cell[]) => {
      if (sequence.length >= 4) {
        sequence.forEach(cell => {

          cellsToRemove.add(cell);
          this.emit("cellRemove", cell);

          if (cell.type === "virus") {

            const index = this.animations.findIndex(e => e.position.compare(cell.position));
            this.animations.push(new BoardAnimation(animationFrames.get(`${cell.color}_v_death`)!, cell.position, false));
            this.emit("virusRemove", cell);

            if (index >= 0) {
              this.animations = this.animations.filter((e, i) => i !== index);
            }
          } else {
            cell.visible = false;
            this.animations.push(new BoardAnimation(animationFrames.get(`${cell.color}_death`)!, cell.position, false));
            this.renderGame();
          }
        });
      }

      if (this.cells.filter(e => e.type === "virus").length === 0) {
        this.emit("gameWin", undefined);
        this.finishGame();
      }
    }

    for (let row = 0; row < this.rowCount; row++) {
      let currentSequence: Cell[] = [];

      for (let col = 0; col < this.columnCount; col++) {
        const cell = this.cells.find(c => c.position.x === col && c.position.y === row);

        if (cell) {
          if (currentSequence.length === 0 || currentSequence[0].color === cell.color) {
            currentSequence.push(cell);
          } else {
            markCellsForRemoval(currentSequence);
            currentSequence = [cell];
          }
        } else {
          markCellsForRemoval(currentSequence);
          currentSequence = [];
        }
      }

      markCellsForRemoval(currentSequence);
    }

    for (let col = 0; col < this.columnCount; col++) {
      let currentSequence: Cell[] = [];

      for (let row = 0; row < this.rowCount; row++) {
        const cell = this.cells.find(c => c.position.x === col && c.position.y === row);

        if (cell) {
          if (currentSequence.length === 0 || currentSequence[0].color === cell.color) {
            currentSequence.push(cell);
          } else {
            markCellsForRemoval(currentSequence);
            currentSequence = [cell];
          }
        } else {
          markCellsForRemoval(currentSequence);
          currentSequence = [];
        }
      }

      markCellsForRemoval(currentSequence);
    }

    this.cells = this.cells.filter(cell => !cellsToRemove.has(cell) && cell.visible);
    this.renderAnimations();
    return;
  }

  public applyGravity() {

    const canMoveDown = (cell: Cell) => {
      if (cell.position.y === this.rowCount - 1) {
        return false;
      } else if (this.cells.find(e => e.position.x === cell.position.x && e.position.y === cell.position.y + 1)) {
        return false;
      } else {
        return true;
      }
    }

    const fall = (cell: Cell) => {
      if (canMoveDown(cell)) {
        cell.position.y++;
        this.renderGame();
        this.emit("cellFall", cell);
        setTimeout(() => fall(cell), 100);
      }
    }

    const markStableCells = (startCell: Cell, stableCells: Set<Cell>) => {
      const stack: Cell[] = [startCell];

      while (stack.length > 0) {
        const cell = stack.pop()!;

        if (!stableCells.has(cell)) {
          stableCells.add(cell);

          const neighbors = this.cells.filter(c =>
            (c.position.x === cell.position.x && Math.abs(c.position.y - cell.position.y) === 1) ||
            (c.position.y === cell.position.y && Math.abs(c.position.x - cell.position.x) === 1)
          );

          neighbors.forEach(neighbor => stack.push(neighbor));
        }
      }
    }

    const stableCells: Set<Cell> = new Set();
    const floatingCells: Set<Cell> = new Set(this.cells);

    for (let col = 0; col < this.columnCount; col++) {
      const groundCell = this.cells.find(cell => cell.position.x === col && cell.position.y === this.rowCount - 1);

      if (groundCell) {
        markStableCells(groundCell, stableCells);
      }
    }

    this.cells.filter(e => e.type === "virus").forEach(e => markStableCells(e, stableCells));
    stableCells.forEach(cell => floatingCells.delete(cell));

    floatingCells.forEach(cell => {
      cell.texture = `${cell.color}_dot`
      fall(cell);
    });
  }

  public preloadImages() {
    const promiseArray = Array.from(textureMappings).map(keyValuePair => {
      return new Promise<HTMLImageElement>(resolve => {
        const image = new Image();
        image.src = keyValuePair[1];
        image.onload = () => resolve(image);
      });
    });

    return Promise.all<HTMLImageElement>(promiseArray)
  }

  private tickWrapper() {
    let currentTick = 0;
    const tick = () => {

      // Let the animations run until animationFrame is cleared
      this.renderAnimations();
      this.emit("frame", undefined);

      if (!this.running) {
        this.requestAnimationFrameId = requestAnimationFrame(tick);
        return;
      }

      currentTick = (currentTick + 1) % refreshRate;

      if (currentTick !== 0) {
        this.requestAnimationFrameId = requestAnimationFrame(tick);
        return;
      }

      this.checkCellCrossings();
      this.applyGravity();

      if (!this.pill) {
        this.requestAnimationFrameId = requestAnimationFrame(tick);
        return;
      }

      if (!this.checkMoveCollisions(0, 1)) {
        this.requestAnimationFrameId = requestAnimationFrame(tick);
        return;
      }

      this.pill!.move(0, 1);
      this.renderGame();
      this.renderPillCanvas();
      this.emit("tick", undefined);
      this.requestAnimationFrameId = requestAnimationFrame(tick);
    }

    this.requestAnimationFrameId = requestAnimationFrame(tick);
  }

  private renderAnimations() {
    const animationsToDelete: number[] = [];

    this.animContext.clearRect(0, 0, this.animCanvas.width, this.animCanvas.height);
    this.animations.forEach((animation, index) => {

      animation.currentTick = (animation.currentTick + 1) % animation.duration;

      if (!animation.infinite && animation.currentTick + 1 >= animation.duration) {
        animationsToDelete.push(index);
        return;
      }

      const frameTexture = new Image();
      frameTexture.src = animation.frames[animation.frameAtTick(animation.currentTick) ?? -1].texture ?? animation.frames[0].texture;
      this.animContext.drawImage(frameTexture, animation.position.x * this.tileSize, animation.position.y * this.tileSize)
    });

    this.animations = this.animations.filter((e, i) => !animationsToDelete.includes(i));
    this.emit("animationRender", undefined);
  }

  private renderGame() {
    const drawCell = (cell: Cell) => {
      const image = new Image();
      image.src = textureMappings.get(cell.texture)!;
      this.gameContext.drawImage(image, cell.position.x * this.tileSize, cell.position.y * this.tileSize)
    }

    // Draw only cells that are not viruses!
    this.gameContext.fillStyle = "black";
    this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.cells.filter(e => e.type === "normal" && e.visible).forEach(e => drawCell(e));
    this.pill?.Cells.forEach(e => drawCell(e));
  }

  private renderPillCanvas() {
    const drawCell = (cell: Cell) => {
      const image = new Image();
      image.src = textureMappings.get(cell.texture)!;
      this.pillContext.drawImage(image, cell.position.x * this.tileSize, cell.position.y * this.tileSize);
    }

    const drawTextureAt = (position: Position, texture: string) => {
      const image = new Image();
      image.src = textureMappings.get(texture)!;
      this.pillContext.drawImage(image, position.x * this.tileSize, position.y * this.tileSize, this.tileSize, this.tileSize)
    }

    this.pillContext.clearRect(0, 0, this.pillCanvas.width, this.pillCanvas.height);

    if (this.pill && Math.min(...this.pill.Cells.map(e => e.position.y)) === -1) {
      const cell = this.pill.Cells.find(e => e.position.y === -1)!;
      const position = new Position(cell.position.x === 3 ? 0 : 1, 5);
      const renderCell = new Cell(position, cell.color);
      renderCell.texture = cell.texture;
      drawCell(renderCell);
    }

    if (Math.min(...this.cells.map(e => e.position.y)) === -1) {
      const cell = this.cells.find(e => e.position.y === -1)!;
      const position = new Position(0, 5);
      const renderCell = new Cell(position, cell.color);
      renderCell.texture = cell.texture;
      drawCell(renderCell);
      this.emit("gameLose", undefined);
      this.finishGame();
    }

    this.nextPill?.Cells.forEach(e => drawCell(e));
    this.pillCanvasTextures.forEach(e => drawTextureAt(e.position, e.texture));
  }

  public async startGame() {
    this.cells = [];
    this.animations = []
    this.pill = undefined;
    this.running = true;
    cancelAnimationFrame(this.requestAnimationFrameId);

    let createdVirusCount = 0;
    while (createdVirusCount < virusCount) {
      for (let i = 0; i < colors.length; i++) {

        if (createdVirusCount === virusCount) {
          break;
        } else if (!this.createVirus(colors[i])) {
          i--;
          continue;
        } else {
          createdVirusCount++;
        }
      }
    }


    this.nextPill = new Pill(
      new Position(10, 3),
      colors[Math.floor(Math.random() * colors.length)],
      colors[Math.floor(Math.random() * colors.length)]
    );

    this.emit("gameStart", undefined);
    this.createPill().then(() => this.renderGame());
    this.renderAnimations();
    this.tickWrapper();
  }

  public finishGame() {
    this.running = false;
    this.emit("gameEnd", undefined);
  }



  public on<K extends keyof EventMap>(eventType: K, callback: EventCallback<EventMap[K]>) {
    this.eventEmitter.on(eventType, callback);
  }

  private emit<K extends keyof EventMap>(eventType: K, payload: EventMap[K]) {
    this.eventEmitter.emit(eventType, payload);
  }
}



// TODO, co tak na prawdę zostało:
// - wirusy w lupie - wszystko                                                                                            łatwe
// - preview tabletki                                                                                                     łatwe?
// - animacja nowej tabletki                                                                                              trudne
// - animacja rzutu + obrót tabletki podczas rzutu                                                                        trudne
// - animacja doktora                                                                                                     średnie