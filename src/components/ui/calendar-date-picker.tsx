// src/components/calendar-date-picker.tsx

"use client";

import { cva, VariantProps } from "class-variance-authority";
import {
  endOfDay,
  endOfMonth, endOfYear,
  startOfDay,
  startOfMonth, startOfYear,
  subDays,
  subHours
} from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const multiSelectVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-muted text-primary-foreground hover:bg-muted/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
					"border border-border bg-background dark:border-none text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-background",
        link: "text-primary underline-offset-4 hover:underline text-background",
      },
      size: {
        sm: "h-8 rounded-md gap-1.5 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    },
  }
);

interface CalendarDatePickerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  id?: string;
  className?: string;
  date: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
  onDateSelect: (range: { from: Date; to: Date }) => void;
}

export const CalendarDatePicker = React.forwardRef<
  HTMLButtonElement,
  CalendarDatePickerProps
>(
  (
    {
      id = "calendar-date-picker",
      className,
      date,
      closeOnSelect = false,
      numberOfMonths = 2,
      yearsRange = 10,
      onDateSelect,
      variant,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedRange, setSelectedRange] = React.useState<string | null>(
      numberOfMonths === 2 ? "This Year" : "Today"
    );
    const [monthFrom, setMonthFrom] = React.useState<Date | undefined>(
      date?.from
    );
    const [yearFrom, setYearFrom] = React.useState<number | undefined>(
      date?.from?.getFullYear()
    );
    const [monthTo, setMonthTo] = React.useState<Date | undefined>(
      numberOfMonths === 2 ? date?.to : date?.from
    );
    const [yearTo, setYearTo] = React.useState<number | undefined>(
      numberOfMonths === 2 ? date?.to?.getFullYear() : date?.from?.getFullYear()
    );
    const [highlightedPart, setHighlightedPart] = React.useState<string | null>(
      null
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleClose = () => setIsPopoverOpen(false);

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate =
        numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      setMonthFrom(from);
      setYearFrom(from.getFullYear());
      setMonthTo(to);
      setYearTo(to.getFullYear());
      closeOnSelect && setIsPopoverOpen(false);
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      if (range) {
        let from = startOfDay(toDate(range.from as Date, { timeZone }));
        let to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
        if (numberOfMonths === 1) {
          if (range.from !== date.from) {
            to = from;
          } else {
            from = startOfDay(toDate(range.to as Date, { timeZone }));
          }
        }
        onDateSelect({ from, to });
        setMonthFrom(from);
        setYearFrom(from.getFullYear());
        setMonthTo(to);
        setYearTo(to.getFullYear());
      }
      setSelectedRange(null);
    };

    const handleMonthChange = (newMonthIndex: number, part: string) => {
      setSelectedRange(null);
      if (part === "from") {
        if (yearFrom !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearFrom, newMonthIndex, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date?.from
              ? new Date(
                  date.from.getFullYear(),
                  newMonth.getMonth(),
                  date.from.getDate()
                )
              : newMonth;
          const to =
            numberOfMonths === 2
              ? date.to
                ? endOfDay(toDate(date.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setMonthFrom(newMonth);
            setMonthTo(date.to);
          }
        }
      } else {
        if (yearTo !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearTo, newMonthIndex, 1);
          const from = date.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to =
            numberOfMonths === 2
              ? endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setMonthTo(newMonth);
            setMonthFrom(date.from);
          }
        }
      }
    };

    const handleYearChange = (newYear: number, part: string) => {
      setSelectedRange(null);
      if (part === "from") {
        if (years.includes(newYear)) {
          const newMonth = monthFrom
            ? new Date(newYear, monthFrom ? monthFrom.getMonth() : 0, 1)
            : new Date(newYear, 0, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date.from
              ? new Date(newYear, newMonth.getMonth(), date.from.getDate())
              : newMonth;
          const to =
            numberOfMonths === 2
              ? date.to
                ? endOfDay(toDate(date.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearFrom(newYear);
            setMonthFrom(newMonth);
            setYearTo(date.to?.getFullYear());
            setMonthTo(date.to);
          }
        }
      } else {
        if (years.includes(newYear)) {
          const newMonth = monthTo
            ? new Date(newYear, monthTo.getMonth(), 1)
            : new Date(newYear, 0, 1);
          const from = date.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to =
            numberOfMonths === 2
              ? endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearTo(newYear);
            setMonthTo(newMonth);
            setYearFrom(date.from?.getFullYear());
            setMonthFrom(date.from);
          }
        }
      }
    };

    const today = new Date();

    const years = Array.from(
      { length: yearsRange + 1 },
      (_, i) => today.getFullYear() - yearsRange / 2 + i
    );

    const dateRanges = [
      { label: "Today", start: today, end: today },
      { label: "Yesterday", start: subDays(today, 1), end: subDays(today, 1) },
      {
        label: "Last hour",
        start: subHours(today, 1),
        end: today,
      },
      {
        label: "Last 7 days",
        start: subDays(today, 7),
        end: today,
      },
      {
        label: "Last 14 days",
        start: subDays(today, 14),
        end: today,
      },
      {
        label: "Last Month",
        start: startOfMonth(subDays(today, today.getDate())),
        end: endOfMonth(subDays(today, today.getDate())),
      },
      { label: "This Year", start: startOfYear(today), end: endOfYear(today) },
    
    ];

    const handleMouseOver = (part: string) => {
      setHighlightedPart(part);
    };

    const handleMouseLeave = () => {
      setHighlightedPart(null);
    };

    const handleWheel = (event: React.WheelEvent, part: string) => {
      event.preventDefault();
      setSelectedRange(null);
      if (highlightedPart === "firstDay") {
        const newDate = new Date(date.from as Date);
        const increment = event.deltaY > 0 ? -1 : 1;
        newDate.setDate(newDate.getDate() + increment);
        if (newDate <= (date.to as Date)) {
          numberOfMonths === 2
            ? onDateSelect({ from: newDate, to: new Date(date.to as Date) })
            : onDateSelect({ from: newDate, to: newDate });
          setMonthFrom(newDate);
        } else if (newDate > (date.to as Date) && numberOfMonths === 1) {
          onDateSelect({ from: newDate, to: newDate });
          setMonthFrom(newDate);
        }
      } else if (highlightedPart === "firstMonth") {
        const currentMonth = monthFrom ? monthFrom.getMonth() : 0;
        const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
        handleMonthChange(newMonthIndex, "from");
      } else if (highlightedPart === "firstYear" && yearFrom !== undefined) {
        const newYear = yearFrom + (event.deltaY > 0 ? -1 : 1);
        handleYearChange(newYear, "from");
      } else if (highlightedPart === "secondDay") {
        const newDate = new Date(date.to as Date);
        const increment = event.deltaY > 0 ? -1 : 1;
        newDate.setDate(newDate.getDate() + increment);
        if (newDate >= (date.from as Date)) {
          onDateSelect({ from: new Date(date.from as Date), to: newDate });
          setMonthTo(newDate);
        }
      } else if (highlightedPart === "secondMonth") {
        const currentMonth = monthTo ? monthTo.getMonth() : 0;
        const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
        handleMonthChange(newMonthIndex, "to");
      } else if (highlightedPart === "secondYear" && yearTo !== undefined) {
        const newYear = yearTo + (event.deltaY > 0 ? -1 : 1);
        handleYearChange(newYear, "to");
      }
    };

    React.useEffect(() => {
      const firstDayElement = document.getElementById(`firstDay-${id}`);
      const firstMonthElement = document.getElementById(`firstMonth-${id}`);
      const firstYearElement = document.getElementById(`firstYear-${id}`);
      const secondDayElement = document.getElementById(`secondDay-${id}`);
      const secondMonthElement = document.getElementById(`secondMonth-${id}`);
      const secondYearElement = document.getElementById(`secondYear-${id}`);

      const elements = [
        firstDayElement,
        firstMonthElement,
        firstYearElement,
        secondDayElement,
        secondMonthElement,
        secondYearElement,
      ];

      const addPassiveEventListener = (element: HTMLElement | null) => {
        if (element) {
          element.addEventListener(
            "wheel",
            handleWheel as unknown as EventListener,
            {
              passive: false,
            }
          );
        }
      };

      elements.forEach(addPassiveEventListener);

      return () => {
        elements.forEach((element) => {
          if (element) {
            element.removeEventListener(
              "wheel",
              handleWheel as unknown as EventListener
            );
          }
        });
      };
    }, [highlightedPart, date]);

    const formatWithTz = (date: Date, fmt: string) =>
      formatInTimeZone(date, timeZone, fmt);

    return (
      <>
        <style>
          {`
            .date-part {
              touch-action: none;
            }
          `}
        </style>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              ref={ref}
              {...props}
              className={cn(
                "w-auto",
                multiSelectVariants({ variant, className })
              )}
              onClick={handleTogglePopover}
              suppressHydrationWarning
            >
              <CalendarIcon className="size-3.5 text-muted-foreground/50" />
              <span>
                {date?.from ? (
                  date.to ? (
                    <>
                      <span
                        id={`firstDay-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstDay" &&
                            "underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstDay")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "dd")}
                      </span>{" "}
                      <span
                        id={`firstMonth-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstMonth" &&
                            "underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstMonth")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "LLL")}
                      </span>
                      ,{" "}
                      <span
                        id={`firstYear-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstYear" &&
                            "underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstYear")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "y")}
                      </span>
                      {numberOfMonths === 2 && date.from.toDateString() !== date.to.toDateString() && (
                        <>
                          {" - "}
                          <span
                            id={`secondDay-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondDay" &&
                                "underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondDay")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date.to, "dd")}
                          </span>{" "}
                          <span
                            id={`secondMonth-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondMonth" &&
                                "underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondMonth")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date.to, "LLL")}
                          </span>
                          ,{" "}
                          <span
                            id={`secondYear-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondYear" &&
                                "underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondYear")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date.to, "y")}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span
                        id="day"
                        className={cn(
                          "date-part",
                          highlightedPart === "day" && "underline"
                        )}
                        onMouseOver={() => handleMouseOver("day")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "dd")}
                      </span>{" "}
                      <span
                        id="month"
                        className={cn(
                          "date-part",
                          highlightedPart === "month" && "underline"
                        )}
                        onMouseOver={() => handleMouseOver("month")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "LLL")}
                      </span>
                      ,{" "}
                      <span
                        id="year"
                        className={cn(
                          "date-part",
                          highlightedPart === "year" && "underline"
                        )}
                        onMouseOver={() => handleMouseOver("year")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date.from, "y")}
                      </span>
                    </>
                  )
                ) : (
                  <span >Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          {isPopoverOpen && (
            <PopoverContent
              className="w-auto !bg-card"
              align="center"
              avoidCollisions={false}
              onInteractOutside={handleClose}
              onEscapeKeyDown={handleClose}
              style={{
                maxHeight: "calc(var(--radix-popover-content-available-height) - 4rem)",
                overflowY: "auto",
              }}
            >
              <div className="flex">
                {numberOfMonths === 2 && (
                  <div className="hidden md:flex flex-col gap-1 pr-4 text-left border-r border-muted-foreground/10">
                    <p className="text-muted-foreground/70 text-xs font-medium uppercase mt-3 pl-3 mb-1">date range</p>
                    {dateRanges.map(({ label, start, end }) => (
                      <Button
                        key={label}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-start text-foreground/80 font-mont tracking-tight",
                          selectedRange === label &&
                            "bg-input hover:bg-foreground dark:text-white"
                        )}
                        onClick={() => {
                          selectDateRange(start, end, label);
                          setMonthFrom(start);
                          setYearFrom(start.getFullYear());
                          setMonthTo(end);
                          setYearTo(end.getFullYear());
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                )}
                  <div className="flex">
                    <Calendar
                      mode="range"
                      defaultMonth={monthFrom}
                      month={monthFrom}
                      onMonthChange={setMonthFrom}
                      selected={date}
                      onSelect={handleDateSelect}
                      numberOfMonths={numberOfMonths}
                      showOutsideDays={false}
                      className={className}
                    />
                  </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </>
    );
  }
);

CalendarDatePicker.displayName = "CalendarDatePicker";