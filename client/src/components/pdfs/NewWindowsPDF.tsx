// src/components/pdfs/NewWindowsPDF.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Job, Room } from "../../interfaces";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import formation_1_1 from "../assets/1:1.png";
import formation_1_2 from "../assets/1:2.png";
import formation_2_1 from "../assets/2:1.png";
import formation_2_2 from "../assets/2:2.png";
import formation_2_4 from "../assets/2:4.png";
import formation_3_1 from "../assets/3:1.png";
import formation_3_1_side from "../assets/3:1_side.png";
import formation_3_2 from "../assets/3:2.png";
import formation_3_3 from "../assets/3:3.png";
import formation_4_1 from "../assets/4:1.png";
import formation_4_2 from "../assets/4:2.png";
import formation_4_4 from "../assets/4:4.png";
import formation_6_1 from "../assets/6:1.png";
import formation_6_1_side from "../assets/6:1_side.png";
import formation_6_2 from "../assets/6:2.png";
import formation_6_2_side from "../assets/6:2_side.png";
import formation_6_4_side from "../assets/6:4_side.png";
import formation_6_6 from "../assets/6:6.png";
import formation_6_6_side from "../assets/6:6_side.png";
import formation_7_1 from "../assets/7:1.png";
const styles = StyleSheet.create({
  // Global styles
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  // Header
  headerBox: {
    backgroundColor: "#b3b3b3",
    padding: 0,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  clientBox: {
    backgroundColor: "#b3b3b3",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderTopWidth: 0,
    borderTopColor: "#fff",
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    width: 70,
    height: 70,
  },
  section: {
    marginBottom: 10,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 8,
    marginBottom: 3,
  },
  // Table styles
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 10,
    margin: 5,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    margin: 5,
  },
  // Column widths
  tableColRef: {
    flex: 0.5,
  },
  tableColRoom: {
    flex: 1,
  },
  tableColDescription: {
    flex: 2,
  },
  tableColQuantity: {
    flex: 1,
  },
  tableColCost: {
    flex: 1,
  },
  // Footer
  footerContainer: {
    backgroundColor: "#dbdbdb",
    padding: 10,
    flexDirection: "row",
    marginTop: 20,
  },
  footerLeft: {
    flex: 2,
    paddingRight: 10,
  },
  footerRight: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 10,
    marginBottom: 5,
  },
  footerRightSection: {
    marginBottom: 10,
  },
  footerRightTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerRightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
  footerRightLabel: {
    fontSize: 10,
  },
  footerRightValue: {
    fontSize: 10,
  },
  // Detailed Summary Table styles
  detailedTableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    paddingVertical: 5,
  },
  detailedTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailedTableCell: {
    fontSize: 10,
    margin: 5,
  },
  detailedTableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    margin: 5,
  },
  // Styles for the image row
  dimensionText: {
    fontSize: 8,
  },
  // Cells for Details, Rate, Qty, Sum in the image row
  detailedColDetailsImageRow: {
    flex: 2,
    justifyContent: "center",
  },
  detailedColRateImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  detailedColQtyImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  detailedColSumImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 2,
    left: 0,
    right: 0,
    height: 35,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  footerBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: "#a3a29f",
  },
  // Adjusted Column widths for Detailed Summary
  detailedColRef: {
    flex: 0.5,
  },
  detailedColRoomName: {
    flex: 1.5,
  },
  detailedColDetails: {
    flex: 3.5,
  },
  detailedColRate: {
    flex: 0.8,
  },
  detailedColQty: {
    flex: 0.8,
  },
  detailedColSum: {
    flex: 0.8,
  },
  // New styles for two-row details
  detailsTextRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  // detailItem: {
  //   fontSize: 8,
  //   marginRight: 5,
  //   marginBottom: 2,
  // },
  // Styles for the final summary below the detailed summary
  finalSummaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  finalSummaryBox: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    padding: 5,
    backgroundColor: "#dbdbdb",
  },
  finalSummaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 3,
  },
  finalSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  finalSummaryLabel: {
    fontSize: 10,
    flex: 1,
    textAlign: "left",
    paddingRight: 5,
  },
  finalSummaryValue: {
    fontSize: 10,
    flex: 1,
    textAlign: "right",
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  imageRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imageCell: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    width: 60,
    height: 90,
    resizeMode: "contain",
  },
  widthLabel: {
    fontSize: 8,
    marginTop: 2,
    flexGrow: 0,
    flexShrink: 0,
  },
  heightLabelContainer: {
    justifyContent: "center",
    marginLeft: 0,
  },
  heightLabel: {
    fontSize: 8,
    alignContent: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  detailItem: {
    fontSize: 8,
    marginBottom: 2,
  },
  detailColumn: {
    flex: 1,
  },
});
const formationImageMap: { [key: string]: string } = {
  "1/1": formation_1_1,
  "1/2": formation_1_2,
  "2/1": formation_2_1,
  "2/2": formation_2_2,
  "2/4": formation_2_4,
  "3/1": formation_3_1,
  "3/1_side": formation_3_1_side,
  "3/2": formation_3_2,
  "3/3": formation_3_3,
  "4/1": formation_4_1,
  "4/2": formation_4_2,
  "4/4": formation_4_4,
  "6/1": formation_6_1,
  "6/1_side": formation_6_1_side,
  "6/2": formation_6_2,
  "6/2_side": formation_6_2_side,
  "6/4_side": formation_6_4_side,
  "6/6": formation_6_6,
  "6/6_side": formation_6_6_side,
  "7/1": formation_7_1,
};

// Helper function to format room details
const formatRoomDetails = (room: Room): string[][] => {
  const detailsArray: string[] = [];

  if (!room.casement) {
    detailsArray.push(`• Sash and Case`);
  } else {
    detailsArray.push(`• Casement Window`);
  }
  detailsArray.push("• Timber: Meranti Hardwood");
  const glassTypeString = "• " + room.glassType + " glass";
  detailsArray.push(glassTypeString);
  detailsArray.push("• Spacer Bar: TBC");
  detailsArray.push("• Colour in: TBC");
  detailsArray.push("• Colour Out: TBC");
  detailsArray.push("• Ironmongery: TBC");
  detailsArray.push("• Easy Clean: TBC");

  // Group the details into pairs
  const pairedDetails: string[][] = [];
  for (let i = 0; i < detailsArray.length; i += 2) {
    pairedDetails.push(detailsArray.slice(i, i + 2));
  }

  return pairedDetails;
};

// Function to calculate the cost for a room
const calculateRoomCost = (room: Room): number => {
  const glassTypeCosts: { [key: string]: number } = {
    Clear: 0,
    Toughened: 50,
    Obscured: 100,
    Laminated: 150,
    Fineo: 220,
  };

  // const panesNumber = room.panesNumber || 0;
  const glassType = room.glassType || "Clear";
  const windowCount = room.count || 1;
  const formationOnly = room.formation.split("_")[0];
  const formationInt = formationOnly
    .split("/")
    .map(Number)
    .reduce((a, b) => a + b);
  const priceChange =
    typeof room.priceChange === "number" ? room.priceChange : 0; // Default to 0 if undefined

  // Handle encapsulation: boolean or number
  const encapsulationCost =
    typeof room.encapsulation === "number"
      ? room.encapsulation * 560
      : room.encapsulation
      ? 560
      : 0;

  // Base cost calculation
  const windowCost = Math.round(
    (((room.width / 1000) * (room.height / 1000) * 200 + 540) * 1.8 +
      30 * formationInt +
      encapsulationCost +
      glassTypeCosts[glassType]) *
      1.28
  );

  const baseCost = windowCost * windowCount;

  // Apply multipliers
  const roomChangeCost = baseCost * (1 + priceChange / 100);
  const withCasementCost = roomChangeCost * (room.casement ? 0.8 : 1); // Apply 20% reduction if casement is true
  let totalCost = withCasementCost;

  // Additional costs
  if (room.dormer) {
    totalCost += 55;
  }
  if (room.easyClean) {
    totalCost += 80;
  }

  // Ensure no NaN values
  if (isNaN(totalCost)) {
    console.warn(
      `Warning: Calculated cost for room "${room.roomName}" is NaN. Check input values.`
    );
    return 0;
  }

  return Math.round(totalCost);
};

// Main component
const NewWindowsPDF: React.FC<{ job: Job }> = ({ job }) => {
  const companyName = "Preservation Windows";
  const companyAddress = "124 Great Western Road";
  const companyCity = "Glasgow";
  const stateZip = "G4 9AD";

  // Calculate costs
  const roomCosts = job.rooms.map((room) => {
    const cost = calculateRoomCost(room);
    return cost;
  });

  // Determine adminFee and planningFee based on planningPermission
  let adminFee = 0;
  let planningFee = 0;

  if (job.planningPermission === "Planning Permission: Conservation Area") {
    adminFee = 50;
    planningFee = 100;
  } else if (
    [
      "Planning Permission: Concervation Area, Category A",
      "Planning Permission: Concervation Area, Category B",
      "Planning Permission: Concervation Area, Category C",
    ].includes(job.planningPermission)
  ) {
    adminFee = 50;
    planningFee = 300;
  }

  // Calculate totals
  let subtotal = roomCosts.reduce((sum, cost) => sum + cost, 0);
  let subtotalWithAdmin = subtotal + adminFee;
  const vatAmount = subtotalWithAdmin * 0.2;
  const total = subtotalWithAdmin + vatAmount + planningFee;

  // Function to get the formation image
  const getFormationImage = (room: Room): string | undefined => {
    if (room.formation.includes("_temp")) {
      return room.imageData;
    } else {
      return formationImageMap[room.formation];
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBox}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Image style={styles.logo} src={logo} />
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>Quotation</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.text}>{companyName}</Text>
              <Text style={styles.text}>{companyAddress}</Text>
              <Text style={styles.text}>{companyCity}</Text>
              <Text style={styles.text}>{stateZip}</Text>
            </View>
          </View>
        </View>
        {/* Client Info */}
        <View style={styles.clientBox}>
          <View style={styles.clientRow}>
            <View>
              <Text style={styles.text}>Quote ID: {job.quoteId}</Text>
              <Text style={styles.text}>Date: {job.date}</Text>
            </View>
            <View>
              <Text style={styles.text}>Client:</Text>
              <Text style={styles.text}>{job.customerName}</Text>
              <Text style={styles.text}>{job.address}</Text>
              <Text style={styles.text}>{job.postCode}</Text>
            </View>
          </View>
        </View>
        {/* Detailed Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Summary</Text>
          {/* Table Header */}
          <View style={styles.detailedTableHeader}>
            <Text style={[styles.detailedTableHeaderCell, styles.detailedColRef]}>
              Ref
            </Text>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColRoomName]}
            >
              Room Name
            </Text>
            <Text style={[styles.detailedTableHeaderCell, styles.detailedColDetails]}>
              Details
            </Text>
            <Text style={[styles.detailedTableHeaderCell, styles.detailedColRate]}>
              Rate (£)
            </Text>
            <Text style={[styles.detailedTableHeaderCell, styles.detailedColQty]}>
              Qty
            </Text>
            <Text style={[styles.detailedTableHeaderCell, styles.detailedColSum]}>
              Sum (£)
            </Text>
          </View>
          {/* Table Rows */}
          {job.rooms.map((room, index) => {
            const roomCost = roomCosts[index];
            const rate = room.count ? Math.round(roomCost / room.count) : 0;
            const formationImage = getFormationImage(room);

            return (
              <View key={index} style={styles.detailedTableRow}>
                {/* Ref */}
                <Text style={[styles.detailedTableCell, styles.detailedColRef]}>
                  {room.ref}
                </Text>
                {/* Room Name */}
                <Text
                  style={[styles.detailedTableCell, styles.detailedColRoomName]}
                >
                  {room.roomName}
                </Text>
                {/* Details */}
                <View style={[styles.detailedTableCell, styles.detailedColDetails]}>
                  {/* Details Text */}
                  {formatRoomDetails(room).map((detailPair, idx) => (
                    <View key={idx} style={styles.detailRow}>
                      {detailPair.map((detail, i) => (
                        <Text key={i} style={styles.detailItem}>
                          {detail}
                        </Text>
                      ))}
                    </View>
                  ))}
                  {/* Image and Dimensions */}
                  <View style={styles.imageRow}>
                    <View style={styles.imageCell}>
                      {formationImage && (
                        <Image style={styles.imageStyle} src={formationImage} />
                      )}
                      {/* Dimensions */}
                      <View style={styles.imageContainer}>
                        <Text style={styles.widthLabel}>
                          Width: {room.width} mm
                        </Text>
                        <Text style={styles.widthLabel}>
                          Height: {room.height} mm
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Rate */}
                <Text style={[styles.detailedTableCell, styles.detailedColRate]}>
                  {rate}
                </Text>
                {/* Quantity */}
                <Text style={[styles.detailedTableCell, styles.detailedColQty]}>
                  {room.count}
                </Text>
                {/* Sum */}
                <Text style={[styles.detailedTableCell, styles.detailedColSum]}>
                  {roomCost}
                </Text>
              </View>
            );
          })}
        </View>
        {/* Final Summary */}
        <View style={styles.finalSummaryContainer}>
          <View style={styles.finalSummaryBox}>
            <Text style={styles.finalSummaryTitle}>Summary</Text>
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>Subtotal</Text>
              <Text style={styles.finalSummaryValue}>{subtotal.toFixed(2)}</Text>
            </View>
            {adminFee > 0 && (
              <View style={styles.finalSummaryRow}>
                <Text style={styles.finalSummaryLabel}>Admin Fee</Text>
                <Text style={styles.finalSummaryValue}>
                  {adminFee.toFixed(2)}
                </Text>
              </View>
            )}
            {planningFee > 0 && (
              <View style={styles.finalSummaryRow}>
                <Text style={styles.finalSummaryLabel}>Planning Fee</Text>
                <Text style={styles.finalSummaryValue}>
                  {planningFee.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>VAT @20%</Text>
              <Text style={styles.finalSummaryValue}>{vatAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>Total</Text>
              <Text style={styles.finalSummaryValue}>{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.text}>Thank you for your business!</Text>
          <View style={styles.footerBox} />
        </View>
      </Page>
    </Document>
  );
};

export default NewWindowsPDF;