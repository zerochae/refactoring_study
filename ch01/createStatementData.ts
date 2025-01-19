import { ComedyCalculator, TragedyCalculator } from "./PerformanceCalculator";
import { Invoice, Performance, Plays, Statement, Play } from "./type";

export function createStatementData(invoice: Invoice, plays: Plays) {
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
