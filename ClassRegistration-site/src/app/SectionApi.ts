export default interface SectionApi {
    sectId: number;
    courseId: number;
    instructorId: number;
    course: {
        courseName: string;
        courseId: number;
        studentId: number;
        deptId: number;
        credits: number;
        fees: number;
        reviews: [
            { 
                reviewId: number;
                score: number;
                text: string;
                date: Date;
                courseId: number;
            }
        ]
            


        
    }
   

}
 
