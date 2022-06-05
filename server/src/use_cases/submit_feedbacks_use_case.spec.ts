import { SubmitFeedbackUseCase } from "./submit_feedback_use_case"

const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () => { } },
            { sendMail: async () => { } }
        );


describe('Submit feesback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'example',
            screenshot: 'test.png',
        })).resolves.not.toThrow();

        expect(createFeedBackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example',
            screenshot: 'data:image/pngbase64,dsiodifhsoidfjisdf',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'Bugs',
            comment: '',
            screenshot: 'data:image/png;base64,dsiodifhsoidfjisdf',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'Bugs',
            comment: 'Bugs everywhere',
            screenshot: 'invalid.png',
        })).rejects.toThrow();
    });
});