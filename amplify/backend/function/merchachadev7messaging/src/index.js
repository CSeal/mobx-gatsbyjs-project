// SNS, email communication in reponse to GraphQL calls

const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

const sns_arn_siteadmin = "arn:aws:sns:us-west-2:692387282546:merchacha-dev-siteadmin";
const ses_from_email = "multidisciplinary01@gmail.com";

// https://medium.com/@xoor/sending-emails-with-attachments-with-aws-lambda-and-node-js-e6a78500227c
const sendEmail = (params_ses) => {
  //console.info("Sending SES email");

  const ses = new AWS.SES();
  const transporter = nodemailer.createTransport({ SES: ses });

  return new Promise(function(resolve, reject) {
    transporter.sendMail(params_ses, function(err, data) {
      if (err) {
        console.info(JSON.stringify(err, null, 2));
        console.info(`Error sending email`);
        //reject (Error(err));
        resolve(false);
      } else {
        console.info('Email sent.');
        resolve(true);
      }
    });
  });
};

const sendSNSsiteadmin = async (params_sns) => {
  //console.info("Site admin SNS publish");
  
  const sns = new AWS.SNS();

  return new Promise(function(resolve, reject) {
    sns.publish(params_sns, function(err, data) {
      if (err) {
        console.info(JSON.stringify(err, null, 2));
        console.info(`Error publishing to SNS.`);
        //reject (Error(err));
        resolve(false);
      } else {
        console.info('Message published to SNS.');
        resolve(true);
      }
    });
  });
};

const resolvers = {
  Query: {
    sendemail: (event) => {
      const { sender = '', emailto = '', subject = '', message = '' } = event.arguments;
      const params = {
        from: ses_from_email,
        to: emailto,
        subject: subject,
        html: `<p>${message}</p><p>From ${sender} user ${event.identity.username}</p>`
      };
      return sendEmail(params);
    },
    sendsnssiteadmin: (event) => {
      const { sender = '', subject = '', message = '' } = event.arguments;
      const params = {
        Message: `From: ${sender}\n Message:\n ${message}`,
        Subject: `${subject} user ${event.identity.username}`,
        TargetArn: sns_arn_siteadmin
      };
      return sendSNSsiteadmin(params);
    }
  },
  VisitorInquiry: {
    sendsns: (event) => {
      const { sender = '', subject = '', message = '' } = event.source;
      const params = {
        Message: `From: ${sender}\n Message:\n ${message}`,
        Subject: subject,
        TargetArn: sns_arn_siteadmin
      };
      return sendSNSsiteadmin(params);
    }
  }
};

exports.handler = async (event) => { //eslint-disable-line
  //const eventText = JSON.stringify(event, null, 2);
  //console.log("Received event:", eventText);

  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      const result = await resolver(event);
      return result;
    } else {
      return false;
    }
  }
};
