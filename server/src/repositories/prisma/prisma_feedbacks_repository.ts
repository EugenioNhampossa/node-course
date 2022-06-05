import { prisma } from "../../prisma";
import { FeedbackCreate, FeedbacksRepository } from "../feedbacks_repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create({type,comment,screenshot}: FeedbackCreate) {
         /** 
     * Creating a new feedback and saving in database
     * The feedback variable will save the response from database after executing the operation
    */

   await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
   });
    }

}