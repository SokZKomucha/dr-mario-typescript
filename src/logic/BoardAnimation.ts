import { Position } from "./Position";

export class BoardAnimation {
  public currentTick: number = 0;
  public frames: BoardAnimationFrame[];
  public infinite: boolean;
  public position: Position;
  public duration: number;

  constructor(frames: BoardAnimationFrame[], position: Position, infinite: boolean) {
    this.frames = frames;
    this.position = position;
    this.infinite = infinite;
    this.duration = this.frames.reduce<number>((prev, curr) => prev + curr.frameDuration, 0);
  }

  /**
   * Returns index of frame in frames, based on tick
   * @param tick 
   * @returns 
   */
  public frameAtTick(tick: number): number {
    if (tick >= this.duration) {
      return this.frameAtTick(tick - this.duration);
    }
    
    let i = 0;
    while (tick >= 0) {
      tick -= this.frames[i].frameDuration;
      i++;   
    }
    
    if (tick < 0) {
      return i - 1;
    } else return 0; // nie wiem czy to faktycznie jest 0, ale nie chcę wiedzieć. Poza tym działa.
  }
}

export class BoardAnimationFrame {
  texture: string;
  frameDuration: number;

  constructor(texture: string, frameDuration: number) {
    this.texture = texture;
    this.frameDuration = frameDuration;
  }
}