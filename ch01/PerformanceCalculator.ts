import { Play, Performance } from "./type";

class PerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  public get amount(): number {
    throw new Error("서브클래스에서 처리");
  }

  public get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

export class TragedyCalculator extends PerformanceCalculator {
  public get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

export class ComedyCalculator extends PerformanceCalculator {
  public get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 1000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  public get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
