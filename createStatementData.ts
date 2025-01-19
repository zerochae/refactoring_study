import { Invoice, Performance, Plays, Statement, Play } from "./type";

class PerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case "comedy": // 희극
        result = 30000;
        if (this.performance.audience > 30) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르 ${this.performance.play.type}`);
    }

    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.performance.play.type) {
      result += Math.floor(this.performance.audience / 5);
    }

    return result;
  }
}

export default function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData = {} as Statement;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  function enrichPerformance(aPerformance: Performance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance) as any;
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
