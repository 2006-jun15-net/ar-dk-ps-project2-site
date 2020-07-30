export interface Student {
	studentId: number,
	residentId: string,
	firstName: string,
	lastName: string,
	deptId: number,
	creditRequirementMet: boolean;
	enrollment: Enrollment[];
}

export interface Course {
	courseName: string;
	credits: number;
	fees: number;
	reviews: Review[];
}

export interface Section {
	instructorId: number;
	course: Course;
	term: string;
}

export interface Enrollment {
	sectionId: number;
	studentId: number;
	sect: Section;
}

export interface Review {
	text: string;
	score: number;
	studentId: number;
	courseId: number;
}

