
export default interface CourseApi {
    courseName: string;
    courseId: number;
    studentId: number;
    deptId: number;
    credits: number;
    fees: number;
    reviews: [];

}





// import { Deserialize } from './deserialize';

// export class CourseApi implements Deserialize {
//     public courseName: string;
//     public courseId: number;
//     public studentId: number;
//     public deptId: number;
//     public credits: number;
//     public fees: number;
//     public reviews: [];

//     deserialize(input: any): this {
//         Object.assign(this, input);
//         return this;
//     }
// }