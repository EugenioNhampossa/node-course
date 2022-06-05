import { MailAdapter } from "../adapters/mail_adapter";
import { FeedbacksRepository } from "../repositories/feedbacks_repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error("Type not Defined");
        }
        if (!comment) {
            throw new Error("Comment not Defined");
        }
        

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: "New Feedback",
            body:[
                `<p>Feedback type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                screenshot? `<img src="${screenshot}">` : '',
            ].join('\n')
        })
    }
}
