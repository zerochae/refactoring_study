import { Invoice, Performance, Plays, Statement, Play } from "./type";

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

class TragedyCalculator extends PerformanceCalculator {
  public get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  public get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 1000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  public get volumeCredits() {
    // @ts-ignore
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

export default function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData = {} as Statement;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
    switch (aPlay.type) {
      case "tragedy":
        return new TragedyCalculator(aPerformance, aPlay);
      case "comedy":
        return new ComedyCalculator(aPerformance, aPlay);
      default:
        throw new Error("알수 없는 장르");
    }
  }

  function enrichPerformance(aPerformance: Performance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    // @ts-ignore
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function totalVolumeCredits(data: Statement) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data: Statement) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
