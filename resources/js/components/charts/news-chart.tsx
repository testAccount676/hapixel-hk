import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
// import { NewspaperIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// const chartDescription = "Notícias criadas nos últimos 7 dias";

const chartData = [
  { day: "Segunda", news: 2 },
  { day: "Terça", news: 305 },
  { day: "Quarta", news: 237 },
  { day: "Quinta", news: 73 },
  { day: "Sexta", news: 209 },
  { day: "Sábado", news: 214 },
  { day: "Domingo", news: 214 },
];

const chartConfig = {
  news: {
    label: "Notícias Reg.",
    // icon: NewspaperIcon ,
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function NewsChart() {
  return (
    <>
      <Card className="border-none">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Gráfico de Notícias</CardTitle>
            <CardDescription>Este é um gráfico que mostra quantidade de notícias criadas nos últimos 7 dias</CardDescription>
          </div>

          <div className="flex">
            <button
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6"

              //data-active={true}
              // className=" relative z-30 h-full flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            >
              <span className="text-muted-foreground text-xs">Total notícias registradas</span>
              <span className="flex items-center gap-1 text-lg leading-none font-bold sm:text-3xl">
                76{/*76 <img className="h-8 w-8" src={"https://www.habboassets.com/assets/badges/DE40K.gif"} />*/}
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="news" fill="#8884d8" radius={2} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
