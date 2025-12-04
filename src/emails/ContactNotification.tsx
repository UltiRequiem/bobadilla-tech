import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactNotificationProps {
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: Date;
}

export const ContactNotification = ({
  name,
  email,
  company,
  message,
  createdAt,
}: ContactNotificationProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 New Contact Form Submission</Heading>

        <Text style={text}>
          You&apos;ve received a new message from the Boba Tech contact form:
        </Text>

        <Section style={infoSection}>
          <Text style={label}>
            <strong>Name:</strong>
          </Text>
          <Text style={value}>{name}</Text>

          <Text style={label}>
            <strong>Email:</strong>
          </Text>
          <Text style={value}>
            <a href={`mailto:${email}`} style={link}>
              {email}
            </a>
          </Text>

          {company && (
            <>
              <Text style={label}>
                <strong>Company:</strong>
              </Text>
              <Text style={value}>{company}</Text>
            </>
          )}

          <Text style={label}>
            <strong>Message:</strong>
          </Text>
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Text style={timestamp}>
            Received: {createdAt.toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          Reply directly to{" "}
          <a href={`mailto:${email}`} style={link}>
            {email}
          </a>{" "}
          to respond to this inquiry.
        </Text>

        <Text style={footer}>
          This notification was sent from the Boba Tech contact form at{" "}
          <a href="https://bobadilla.work" style={link}>
            bobadilla.work
          </a>
        </Text>
      </Container>
    </Body>
  </Html>
);

ContactNotification.PreviewProps = {
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Corp",
  message:
    "Hi, I&apos;m interested in your MVP development services. Can we schedule a call to discuss our project?",
  createdAt: new Date(),
} as ContactNotificationProps;

export default ContactNotification;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 40px",
};

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "20px",
  margin: "16px 40px 4px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  color: "#1f2937",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 40px 8px",
};

const messageBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  margin: "0 40px 16px",
  padding: "16px",
};

const messageText = {
  color: "#1f2937",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const timestamp = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 40px 16px",
};

const infoSection = {
  padding: "24px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 40px",
};

const link = {
  color: "#06b6d4",
  textDecoration: "none",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "8px 40px",
};
