import { Invoice, Performance, Plays, Statement } from "./type";

export default function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData = {} as Statement;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  function enrichPerformance(aPerformance: Performance) {
    const result = Object.assign({}, aPerformance) as any;
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 30) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르 ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf: Performance) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === perf.play.type) {
      result += Math.floor(perf.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits(data: Statement) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data: Statement) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
