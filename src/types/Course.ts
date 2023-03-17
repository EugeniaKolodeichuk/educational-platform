export interface CourseVideoPreview {
    link: string;
    duration: number;
    previewImageLink: string;
}

export interface Meta {
    slug: string;
    skills: string[];
    courseVideoPreview: CourseVideoPreview;
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
}

export interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta?: any;
}

export interface Course {
    id: string;
    title: string;
    tags: string[];
    launchDate: Date;
    status: string;
    description: string;
    duration: number;
    previewImageLink: string;
    rating: number;
    meta: Meta;
    lessons: Lesson[];
    lessonsCount?: number;
    containsLockedLessons: boolean;
}