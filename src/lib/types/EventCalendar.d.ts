
export type Content = string | { html: string } | { domNodes: Node[] };

export interface Duration {
    years?: number;
    months?: number;
    days?: number;
    seconds?: number;
    inWeeks?: boolean;
}

export interface Resource {
    id: string;
    title: Content;
    eventBackgroundColor?: string;
    eventTextColor?: string;
    extendedProps?: Record<string, any>;
    children?: Resource[];
}

export interface View {
    type: string;
    title: string;
    currentStart: Date;
    currentEnd: Date;
    activeStart: Date;
    activeEnd: Date;
}

export interface Event {
    id: string;
    resourceIds: string[];
    allDay: boolean;
    start: Date;
    end: Date;
    title: Content;
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    display: 'auto' | 'background' | 'ghost' | 'preview' | 'pointer';
    backgroundColor?: string;
    textColor?: string;
    classNames: string[];
    styles: string[];
    extendedProps: Record<string, any>;
}

export interface EventInput {
    id?: string | number;
    allDay?: boolean;
    start: string | Date;
    end?: string | Date;
    title?: Content;
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    resourceIds?: string[] | string | number;
    resourceId?: string | number;
    display?: 'auto' | 'background';
    backgroundColor?: string;
    textColor?: string;
    color?: string;
    classNames?: string[] | string;
    className?: string[] | string;
    styles?: string[] | string;
    style?: string[] | string;
    extendedProps?: Record<string, any>;
}

export interface EventSource {
    url?: string;
    method?: string;
    extraParams?: Record<string, any> | (() => Record<string, any>);
    events?: (info: {
        start: Date;
        end: Date;
        startStr: string;
        endStr: string;
    }, successCallback: (events: EventInput[]) => void, failureCallback: (error: any) => void) => void | EventInput[] | Promise<EventInput[]>;
}

export interface CalendarOptions {
    allDayContent?: Content | ((arg: { text: string }) => Content);
    allDaySlot?: boolean;
    buttonText?: Record<string, string> | ((text: Record<string, string>) => Record<string, string>);
    customButtons?: Record<string, {
        text?: Content;
        click: (mouseEvent: MouseEvent) => void;
        active?: boolean;
    }>;
    date?: Date | string;
    dateClick?: (info: {
        date: Date;
        dateStr: string;
        allDay: boolean;
        dayEl: HTMLElement;
        jsEvent: MouseEvent;
        view: View;
        resource?: Resource;
    }) => void;
    datesAboveResources?: boolean;
    datesSet?: (info: {
        start: Date;
        end: Date;
        startStr: string;
        endStr: string;
        view: View;
    }) => void;
    dayCellFormat?: object | ((date: Date) => Content);
    dayHeaderFormat?: object | ((date: Date) => Content);
    dayMaxEvents?: boolean;
    displayEventEnd?: boolean;
    dragScroll?: boolean;
    duration?: string | number | Duration;
    editable?: boolean;
    events?: EventInput[];
    eventSources?: EventSource[];
    eventClick?: (info: {
        el: HTMLElement;
        event: Event;
        jsEvent: MouseEvent;
        view: View;
    }) => void;
    eventContent?: Content | ((info: {
        event: Event;
        timeText: string;
        view: View;
    }) => Content | undefined);
    headerToolbar?: {
        start?: string;
        center?: string;
        end?: string;
    };
    height?: string;
    nowIndicator?: boolean;
    resources?: Resource[];
    selectable?: boolean;
    view?: string;
    views?: Record<string, Partial<CalendarOptions>>;
    // Add other options as needed
}

export interface CalendarProps {
    plugins: any[];
    options: CalendarOptions;
}

export class Calendar {
    constructor(options: { target: HTMLElement, props: { plugins: any[], options: CalendarOptions } });
    getOption(name: string): any;
    setOption(name: string, value: any): Calendar;
    addEvent(event: EventInput): Event | null;
    getEventById(id: string | number): Event | null;
    getEvents(): Event[];
    removeEventById(id: string | number): Calendar;
    updateEvent(event: Partial<EventInput> & { id: string | number }): Calendar;
    refetchEvents(): Calendar;
    dateFromPoint(x: number, y: number): {
        date: Date;
        allDay: boolean;
        dayEl: HTMLElement;
        resource?: Resource;
    } | null;
    getView(): View;
    next(): Calendar;
    prev(): Calendar;
    unselect(): Calendar;
}