// test.tsx

import { PDFViewer } from "@react-pdf/renderer";
import NewWindowsPDF from "./pdfs/NewWindowsPDF"; // Ensure this path matches your file structure

// Dummy data for testing
const dummyJob = {
  date: "2025-02-14",
  customerName: "John Doe",
  quoteId: 44,
  addressLineOne: "123 Dummy Street",
  addressLineTwo: "Dummy City",
  addressLineThree: "Dummy Country",
  address: "123 Dummy Street, Dummy City, Dummy Country",
  postCode: "D1 2AB",
  planningPermission: "Planning Permission: Conservation Area, Category A",
  rooms: [] as any[],
  completed: false,
  email: "[email protected]",
  phone: "0123456789",
  options: [],
  siteNotes: "",
};

// Create 12 dummy rooms to test page breaks and table alignment
for (let i = 1; i <= 12; i++) {
  dummyJob.rooms.push({
    ref: `R${i}`,
    roomName: `Room ${i}`,
    width: 1200,
    height: 1500,
    count: 1,
    casement: false,
    glassType: "Clear",
    glassTypeTopBottom: "Bottom",
    stainRepairs: 0,
    dormer: false,
    concealedVent: false,
    trickleVent: false,
    handles: false,
    shutters: false,
    easyClean: true,
    eC: false,
    customItem: false,
    customItem2: 0,
    formation: "1/1", // This key exists in your formationImageMap
    priceChange: 0,
    priceChangeNotes: "",
    quoteNotes: "Standard window",
    panesNumber: 2,
    encapsulation: false,
  });
}

const Test: React.FC = () => {
  return (
    <PDFViewer width="1000" height="600">
      <NewWindowsPDF job={dummyJob} />
    </PDFViewer>
  );
};

export default Test;
