import ReviewCreateApi from './ReviewCreateApi';

export default interface ReviewApi extends ReviewCreateApi {
    reviewId: number;
    //score: number;
    //text: string;
    date: Date;
    //courseId: number;
    studentId: number;

}