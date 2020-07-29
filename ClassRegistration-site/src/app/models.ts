export interface Student {
	studentId: number,
	residentId: string,
	firstName: string,
	lastName: string,
	deptId: number,
	creditRequirementMet: boolean;
}

export interface Course {
	courseName: string;
	credits: number;
	fees: number;
}

export interface Section {
	instructorId: number;
	course: Course;
	term: string;
}

export interface Enrollment {
	section: Section;
}

