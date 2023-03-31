import nodemailer from "nodemailer";
import { FRONTEND_URL, SEND_EMAIL_PASS, SEND_EMAIL_USER } from "../config";

const sendEmail = async (
  name: string,
  email: string,
  token: string,
  isVerification: boolean
) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SEND_EMAIL_USER, // generated ethereal user
      pass: SEND_EMAIL_PASS,
    },
  });

  const html = `<div class="MuiGrid-root mui-style-8ltqia-MuiGrid-root" style="box-sizing: border-box; flex-direction: row; margin: 30px; background-color: rgb(252, 248, 222); border-top: 5px solid rgb(244, 133, 171); border-right-color: rgb(244, 133, 171); border-bottom-color: rgb(244, 133, 171); border-left-color: rgb(244, 133, 171); width: 638.5px; color: rgba(0, 0, 0, 0.87); font-family: &quot;PT Sans&quot;; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h3 class="MuiTypography-root MuiTypography-h3 MuiTypography-alignCenter mui-style-tzpkzj-MuiTypography-root" style="box-sizing: inherit; margin: 10px 0px 30px; font-size: 36px; font-weight: 550; line-height: 46px; letter-spacing: 1px; font-family: &quot;PT Sans&quot;; text-align: center; color: rgb(244, 133, 171);">CrowdFundingFE</h3><div class="MuiGrid-root mui-style-vj1n65-MuiGrid-root" style="box-sizing: border-box; flex-direction: row;"><p class="MuiTypography-root MuiTypography-body2 mui-style-awg37i-MuiTypography-root" style="box-sizing: inherit; margin: 0px; font-size: 18px; font-weight: 400; font-family: &quot;PT Sans&quot;; line-height: 1.43; padding: 10px;">${name},</p><p class="MuiTypography-root MuiTypography-body2 mui-style-awg37i-MuiTypography-root" style="box-sizing: inherit; margin: 0px; font-size: 18px; font-weight: 400; font-family: &quot;PT Sans&quot;; line-height: 1.43; padding: 10px;">  
  ${isVerification ? "" : "There was a request to change your password."}
  </p><p class="MuiTypography-root MuiTypography-body2 mui-style-awg37i-MuiTypography-root" style="box-sizing: inherit; margin: 0px; font-size: 18px; font-weight: 400; font-family: &quot;PT Sans&quot;; line-height: 1.43; padding: 10px;">${
    isVerification
      ? "Thanks for creating a account on Crowfunding. Please verify your email address by clicking the button below. This link will expires in 15 minutes."
      : "Forget your password by clicking the button below. This link will expires in 15 minutes."
  }</p></div><div class="MuiGrid-root MuiGrid-item mui-style-we1pe7-MuiGrid-root" style="box-sizing: border-box; flex-direction: row; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; width: 638.5px; margin: 10px;"><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium mui-style-5ku08p-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" style="box-sizing: border-box; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center; position: relative; -webkit-tap-highlight-color: transparent; outline: 0px; border: 0px; margin: 0px 0px 3px; cursor: pointer; user-select: none; vertical-align: middle; appearance: none; text-decoration: none; text-align: center; flex: 0 0 auto; padding: 8px; overflow: visible; transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; display: inline-flex; height: 35px; font-size: 18px; border-radius: 5px; color: white; background-color: rgb(244, 133, 171); width: 191.547px;">
  
  <a href="${FRONTEND_URL}/${
    isVerification ? "email-verify" : "forgot-password-verify"
  }?token=${token}" style="color:white; text-decoration: none;">${
    isVerification ? "Verify email address" : "Forget your password"
  }</a> <span class="MuiTouchRipple-root mui-style-8je8zh-MuiTouchRipple-root" style="box-sizing: inherit; overflow: hidden; pointer-events: none; position: absolute; z-index: 0; inset: 0px; border-radius: inherit;"></span></button></div><p class="MuiTypography-root MuiTypography-body2 mui-style-luykof-MuiTypography-root" style="box-sizing: inherit; margin: 0px; font-size: 18px; font-weight: 400; font-family: &quot;PT Sans&quot;; line-height: 1.43; padding-left: 10px;">Thank You,</p><p class="MuiTypography-root MuiTypography-body2 mui-style-luykof-MuiTypography-root" style="box-sizing: inherit; margin: 0px; font-size: 18px; font-weight: 400; font-family: &quot;PT Sans&quot;; line-height: 1.43; padding-left: 10px;">CrowdFundingFE</p></div> `;

  // const emailHtml = ` <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="color: rgb(34, 34, 34); font-family: Helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border-collapse: separate; width: 882px;"><tbody><tr><td valign="top" style="margin: 0px; font-size: 14px; vertical-align: top;"> </td><td width="500" valign="top" style="margin: 0px auto !important; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 500px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width: 500px; background: rgb(255, 255, 255); border: 0px; font-family: Helvetica, sans-serif;"><tbody><tr><td valign="top" style="margin: 0px; font-size: 12px; vertical-align: top;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 500px;"><tbody><tr><td style="margin: 0px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px; color: rgb(255, 255, 255); font-weight: bold; text-align: center; width: 500px;"><tbody><tr><td style="margin: 0px;"><img width="105" height="27" src="https://ci5.googleusercontent.com/proxy/wfx3hGgQ6s4QgvQadM2yNdf6xPbCtQuJhLMskQeMqz68acU6jGJ4sJujesSLHqmggRH9dB5WEQYurqzXkcqyOFdSRQhOJpJ0JEofdN-6ELNCrU4xoh0=s0-d-e1-ft#https://d36jcksde1wxzq.cloudfront.net/saas-mega/DockerWhaleIcon.png" class="CToWUd" data-bit="iit"></td></tr></tbody></table></td></tr><tr><td valign="top" style="margin: 0px; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 10px 20px 20px; border-bottom: none;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; width: 460px; box-sizing: border-box;"><tbody><tr><td align="left" valign="top" style="margin: 0px; font-size: 14px; vertical-align: top;"><h1 style="font-size: 16px; font-weight: bold; margin: 0px;"></h1><div style="font-size: 30px;">Hi ${name},</div><div style="margin: 18px 0px;">${
  //   isVerification
  //     ? "Thanks for creating a account on Crowfunding. Please verify your email address by clicking the button below. This link will expires in 15 minutes."
  //     : "Forget your password by clicking the button below. This link will expires in 15 minutes."
  // }</div><div style="padding: 10px 0px; text-align: left; vertical-align: top;"><a href="${FRONTEND_URL}/${
  //   isVerification ? "email-verify" : "forgot-password-verify"
  // }?token=${token}" style="color: rgb(255, 255, 255); box-sizing: border-box; text-decoration: none; background-color: rgb(0, 123, 255); border: 1px solid rgb(0, 123, 255); border-radius: 4px; font-size: 16px; font-weight: bold; margin: 0px; padding: 9px 25px; display: inline-block; letter-spacing: 1px;">${
  //   isVerification ? "Verify email address" : "Forget your password"
  // }</a></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`;

  const info = await transporter.sendMail({
    from: 'TheAbhi" <foo@example.com>',
    to: email,
    subject: isVerification
      ? "Mail for email verification"
      : "Mail for forget password",

    html: html,
  });

  const previewUrl = `"Preview URL: %s", ${nodemailer.getTestMessageUrl(info)}`;

  return previewUrl;
};

export default sendEmail;
