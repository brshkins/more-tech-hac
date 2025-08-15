"use client";
import { PieChartIcon } from "lucide-react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { useMemo } from "react";
import { calculatePercentage } from "@/shared/lib/calcCharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const VoiceReactionAssistantAnalytics = () => {
  const analytics = useAppSelector(messageSelectors.messageAnalytics);

  const chartData = useMemo(() => {
    return [
      {
        browser: "dislike",
        visitors: analytics?.dislike || 0,
        color: "gray",
      },
      {
        browser: "like",
        visitors: analytics?.like || 0,
        color: "red",
      },
    ];
  }, [analytics]);

  const total = (analytics?.like || 0) + (analytics?.dislike || 0);
  const hasData = total > 0;

  return (
    <Card className="flex flex-col bg-zinc-900 border-none">
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                outerRadius={80}
                stroke="var(--background)"
                strokeWidth={1}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 5} />
                )}
                fill="#8884d8"
              >
                {chartData.map((cell, index) => (
                  <Cell key={`cell-${index}`} fill={cell.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <PieChartIcon className="w-12 h-12 text-gray-500" />
            <div className="text-gray-400">
              <p className="font-medium">Статистика еще не сформирована</p>
              <p className="text-sm">
                Здесь будет отображаться реакция пользователей
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-3 text-sm text-white">
        {hasData ? (
          <>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>
                  Довольны: {calculatePercentage(analytics?.like || 0, total)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span>
                  Не довольны:{" "}
                  {calculatePercentage(analytics?.dislike || 0, total)}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-red-500 h-1.5 rounded-full"
                style={{
                  width: `${calculatePercentage(analytics?.like || 0, total)}%`,
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full text-center">
            <div className="leading-none text-muted-foreground">
              Как только пользователи начнут реагировать, данные появятся здесь
            </div>
            <div className="text-xs text-gray-500">
              Ожидайте появления статистики
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
