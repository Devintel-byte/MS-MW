import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Img,
  Hr,
  Link,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  eventName: string;
  imageUrl: string;
  message?: string;
  downloadLink?: string;
}

// Type-safe styling with React.CSSProperties
const styles = {
  main: {
    backgroundColor: "#f6f6f6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  } as React.CSSProperties,
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
  } as React.CSSProperties,
  header: {
    textAlign: "center" as const,
    padding: "20px 0",
    borderBottom: "1px solid #eaeaea",
  } as React.CSSProperties,
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    margin: "0",
  } as React.CSSProperties,
  subheading: {
    fontSize: "16px",
    color: "#666666",
    margin: "10px 0 0",
  } as React.CSSProperties,
  content: {
    padding: "20px 0",
  } as React.CSSProperties,
  greeting: {
    fontSize: "18px",
    color: "#333333",
    margin: "0 0 20px",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "16px",
    color: "#555555",
    lineHeight: "1.5",
    margin: "0 0 20px",
  } as React.CSSProperties,
  photoCard: {
    margin: "20px 0",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  image: {
    maxWidth: "100%",
    borderRadius: "6px",
    border: "1px solid #eaeaea",
  } as React.CSSProperties,
  photoCaption: {
    fontSize: "14px",
    color: "#666666",
    margin: "10px 0 0",
  } as React.CSSProperties,
  divider: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #eaeaea",
  } as React.CSSProperties,
  buttonContainer: {
    textAlign: "center" as const,
    margin: "20px 0",
  } as React.CSSProperties,
  button: {
    backgroundColor: "#0070f3",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "inline-block",
  } as React.CSSProperties,
  footer: {
    fontSize: "14px",
    color: "#999999",
    textAlign: "center" as const,
    margin: "20px 0 0",
  } as React.CSSProperties,
};

export const EmailTemplate = ({
  name,
  eventName,
  imageUrl,
  message = "Thank you for joining us! Here's your memory from the event.",
  downloadLink = "#",
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Memory from {eventName}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.heading}>✨ Your Event Memory ✨</Heading>
            <Text style={styles.subheading}>{eventName}</Text>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.greeting}>Hi {name},</Text>
            <Text style={styles.paragraph}>{message}</Text>

            {/* PhotoCard */}
            <Container style={styles.photoCard}>
              <Img
                src={imageUrl}
                alt={`Memory from ${eventName}`}
                style={styles.image}
              />
              <Text style={styles.photoCaption}>
                <strong>{name}</strong> at <strong>{eventName}</strong>
              </Text>
            </Container>

            <Hr style={styles.divider} />

            {/* Download Button */}
            <Section style={styles.buttonContainer}>
              <Link href={downloadLink} style={styles.button}>
                Download Your Photo
              </Link>
            </Section>

            <Text style={styles.footer}>
              Want to share this memory? Forward this email or tag us on social media!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};