export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public compare(to: Position) {
    return this.x === to.x && this.y === to.y;
  }
}