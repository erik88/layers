import type { Visit } from "../domain/visit.ts";

export function visitTableTemplate(visits: Visit[]) {
    return `
    <style>
        td,th {border: 1px solid gray; text-align: center}
        table {border-collapse: collapse}
    </style>
    <table>
        <tr>
        <th>Id</th>
        <th>Time</th>
        </tr>
    ${
        visits.map((v) =>
            `<tr><td>${v.id}</td><td>${v.time.toLocaleString()}</td></tr>`
        )
            .join("")
    }
    </table>
    `;
}
