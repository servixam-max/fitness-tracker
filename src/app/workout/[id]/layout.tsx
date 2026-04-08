import { WORKOUT_DAYS } from "@/data/workouts";

export function generateStaticParams() {
  return WORKOUT_DAYS.map((day) => ({
    id: day.id,
  }));
}

export default function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
