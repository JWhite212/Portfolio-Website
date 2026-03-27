import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-[#f2eee6] px-6 py-10 font-sans text-[#151a19]">
          <Container className="mx-auto max-w-[620px] rounded-[24px] border border-[#d5d0c6] bg-white px-8 py-8">
            <Section>
              <Text className="m-0 text-[11px] uppercase tracking-[0.35em] text-[#5d635f]">
                Portfolio enquiry
              </Text>
              <Heading className="mb-0 mt-4 text-[28px] font-semibold leading-[1.15] text-[#151a19]">
                New message from the portfolio contact form
              </Heading>
              <Text className="mb-0 mt-4 text-[15px] leading-7 text-[#47504b]">
                Sender: <strong>{senderEmail}</strong>
              </Text>
              <Hr className="my-6 border-[#d5d0c6]" />
              <Text className="m-0 text-[15px] leading-7 text-[#151a19]">
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
