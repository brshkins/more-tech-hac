import { Candidate } from "@/entities/candidate/types/types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Aeroport",
  fonts: [
    { src: "/fonts/Aeroport.ttf" },
    { src: "/fonts/Aeroport-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Aeroport-Italic.ttf", fontStyle: "italic" },
    {
      src: "/fonts/Aeroport-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Стили
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Aeroport",
    fontSize: 12,
    color: "#333",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2 solid #007ACC",
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007ACC",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#F7F9FC",
  },
  label: {
    fontWeight: "bold",
    color: "#007ACC",
  },
  divider: {
    marginVertical: 10,
    borderBottom: "1 solid #E0E0E0",
  },
  transcript: {
    marginTop: 5,
    fontStyle: "italic",
    color: "#555",
  },
});

const sanitize = (text?: string) =>
  text
    ? text
        .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";

const CandidateReport = ({ candidate }: { candidate: Candidate }) => (
  <Document>
    <Page style={styles.page}>
      {/* Хедер с логотипом */}
      <View style={styles.headerContainer}>
        <Image src="/images/logo.jpg" style={styles.logo} />
        <Text style={styles.headerText}>Отчет о кандидате</Text>
      </View>

      {/* Основной блок */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Имя:</Text> {sanitize(candidate.name)}
        </Text>
        <Text>
          <Text style={styles.label}>Вакансия:</Text>{" "}
          {candidate.vacancy?.post || "Не указана"}
        </Text>
        <Text>
          <Text style={styles.label}>Статус:</Text> {sanitize(candidate.status)}
        </Text>
        <Text>
          <Text style={styles.label}>Дата:</Text> {sanitize(candidate.date)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Сильные стороны:</Text>
        <Text>{sanitize(candidate.strengths)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Зоны роста:</Text>
        <Text>{sanitize(candidate.gaps)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Рекомендация:</Text>
        <Text>{sanitize(candidate.recommendation)}</Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Технический балл:</Text>{" "}
          {candidate.technicalScore ?? "N/A"}
        </Text>
        <Text>
          <Text style={styles.label}>Коммуникации:</Text>{" "}
          {candidate.communicationScore ?? "N/A"}
        </Text>
        <Text>
          <Text style={styles.label}>Кейсы:</Text>{" "}
          {candidate.casesScore ?? "N/A"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Транскрипт:</Text>
        <Text style={styles.transcript}>{sanitize(candidate.transcript)}</Text>
      </View>
    </Page>
  </Document>
);

export default CandidateReport;
