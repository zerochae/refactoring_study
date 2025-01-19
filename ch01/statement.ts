import { createStatementData } from "./createStatementData";
import { Invoice, Plays, Statement } from "./type";

function statement(invoice: Invoice, plays: Plays) {
  return renderHTML(createStatementData(invoice, plays));
}

//function htmlStatemnet(invoice: Invoice, plays: Plays) {
//  return renderHTML(createStatementData(invoice, plays));
//}

function usd(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderHTML(data: Statement) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1/>\n`;
  result += "<table>\n";
  result += `<tr><th>연극</th><th>좌석 수</th><th>rmador</th></tr>`;
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</tr></td>`;
    result += `<tr><td>${perf.audience}석)</tr></td>`;
    result += `<tr><td>${usd(perf.amount)}</tr></td>`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
}

export { statement };
