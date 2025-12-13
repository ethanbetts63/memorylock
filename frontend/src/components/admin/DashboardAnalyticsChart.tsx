"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  profileCreations: {
    label: "Profiles",
    color: "hsl(var(--chart-1))",
  },
  eventCreations: {
    label: "Events",
    color: "hsl(var(--chart-2))",
  },
  successfulPayments: {
    label: "Payments",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface DashboardAnalyticsChartProps {
    data: any[];
}

export function DashboardAnalyticsChart({ data }: DashboardAnalyticsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Activity</CardTitle>
        <CardDescription>
          Showing profile creations, event creations, and successful payments for the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month" // This key from the backend holds the date string
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="profileCreations"
              type="natural"
              fill="var(--color-profileCreations)"
              fillOpacity={0.4}
              stroke="var(--color-profileCreations)"
              stackId="a"
            />
            <Area
              dataKey="eventCreations"
              type="natural"
              fill="var(--color-eventCreations)"
              fillOpacity={0.4}
              stroke="var(--color-eventCreations)"
              stackId="a"
            />
            <Area
              dataKey="successfulPayments"
              type="natural"
              fill="var(--color-successfulPayments)"
              fillOpacity={0.4}
              stroke="var(--color-successfulPayments)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
