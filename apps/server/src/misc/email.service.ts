import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  SendMailOptions,
  TestAccount,
} from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  account: TestAccount;

  constructor(private readonly logger: Logger) {
    this.logger.setContext('Email Service');
  }

  // async..await is not allowed in global scope, must use a wrapper
  async send(options: SendMailOptions) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    this.logger.debug('Creating Test Account...');

    this.account = await createTestAccount();

    this.logger.log('Test Email Account created');

    this.logger.debug('Creating Transport...');

    // create reusable transporter object using the default SMTP transport
    const transport = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.account.user, // generated ethereal user
        pass: this.account.pass, // generated ethereal password
      },
    });

    this.logger.log('Transport created');

    this.logger.debug('Sending Email...');

    // send mail with defined transport object
    const info = await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      ...options,
    });

    this.logger.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    const testUrl = getTestMessageUrl(info);

    // Preview only available when sending through an Ethereal account
    this.logger.log('Preview URL: %s', testUrl && testUrl);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
