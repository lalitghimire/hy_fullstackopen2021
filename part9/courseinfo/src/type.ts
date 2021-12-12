//types

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescriptionBase extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseDescriptionBase {
    type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionBase {
    type: 'submission';
    exerciseSubmissionLink: string;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart;
