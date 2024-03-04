import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const payload = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: `Inquiry <onboarding@resend.dev>`,
      to: "info.certiblock@gmail.com",
      subject: "Inquiry from Certi-Block",
      html: `<p>Hello,</p>
            <p>Inquiry recieved from website</p>
            <p>Here are the details:</p>
            <p>Name: ${payload.name}</p>
            <p>Email: ${payload.email}</p>
            <p>Message: ${payload.message}</p>
            <p>Thanks,</p>
            <p>Certi-Block</p>`,
    });
    if (error) {
      console.log(error.message);
      return Response.json({ message: "Error sending email" });
    }
    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: "Error sending email" });
  }
}
