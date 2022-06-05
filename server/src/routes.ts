import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer_mail_adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { SubmitFeedbackUseCase } from './use_cases/submit_feedback_use_case';
export const routes = express.Router();


routes.post("/feedbacks", async (req, res) => {

    //* HTTP METHODS

    //GET, POST, PUT, PATCH, DELETE

    //GET = Get information
    //POST = Save Information
    //PUT = Update information from an entity
    //PATCH = Update a unique information from an entity
    //DELETE = delete an information

    //Receiving data from request 
    const { type, comment, screenshot } = req.body;

    /** 
     * Creating a new feedback and saving in database
     * The feedback variable will save the response from database after executing the operation
    */
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })
    
    //201 : created
    //Returning the database feedback
    return res.status(201).send();
});
