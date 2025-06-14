import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const chartData = [
  { day: "2025-04-27", players: 12 },
  { day: "2025-04-28", players: 18 },
  { day: "2025-04-29", players: 22 },
  { day: "2025-04-30", players: 25 },
  { day: "2025-05-01", players: 15 },
  { day: "2025-05-02", players: 30 },
  { day: "2025-05-03", players: 27 },
];

export default function MostPlayedChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Atividade de Jogadores</CardTitle>
          <CardDescription>Você pode verificar as recentes atividades de login no Hapixel Hotel</CardDescription>
        </div>

        <div className="flex">
          <button
            //data-active={true}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-muted-foreground text-xs">Total de logins</span>
            <span className="flex items-center gap-1 text-lg leading-none font-bold sm:text-3xl">
              13{/* <img className="h-8 w-8" src={"https://www.habboassets.com/assets/badges/US597.gif"} />*/}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="players" stroke="#1DBC60" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
