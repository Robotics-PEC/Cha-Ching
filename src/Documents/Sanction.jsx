import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const Sanction = ({ formData = {} }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      flexDirection: "column",
      fontFamily: "Times-Roman",
      lineHeight: 1.3,
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
    },
    title1: {
      fontSize: 16,
      fontFamily: "Times-Bold",
      marginBottom: 5,
    },
    title2: {
      fontSize: 14,
      fontFamily: "Times-Bold",
      marginBottom: 15,
    },
    formSection: {
      marginBottom: 15,
    },
    fieldRow: {
      flexDirection: "row",
      marginBottom: 8,
      alignItems: "flex-start",
    },
    fieldLabel: {
      fontFamily: "Times-Bold",
      minWidth: 120,
      marginRight: 10,
    },
    fieldValue: {
      flex: 1,
      borderBottom: "1pt solid black",
      paddingBottom: 2,
      minHeight: 15,
    },
    multiFieldRow: {
      flexDirection: "row",
      marginBottom: 8,
      justifyContent: "space-between",
    },
    multiField: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
    },
    multiFieldLabel: {
      fontFamily: "Times-Bold",
      marginRight: 5,
    },
    multiFieldValue: {
      flex: 1,
      borderBottom: "1pt solid black",
      paddingBottom: 2,
      minHeight: 15,
      marginRight: 15,
    },
    yesNoRow: {
      flexDirection: "row",
      marginBottom: 8,
      alignItems: "center",
    },
    yesNoText: {
      flex: 1,
      fontFamily: "Times-Roman",
    },
    yesNoAnswer: {
      fontFamily: "Times-Bold",
      marginLeft: 10,
    },
    permissionText: {
      marginBottom: 15,
      fontFamily: "Times-Roman",
    },
    expenditureHeader: {
      fontSize: 13,
      fontFamily: "Times-Bold",
      marginBottom: 10,
      textAlign: "center",
    },
    table: {
      marginBottom: 15,
    },
    tableHeader: {
      flexDirection: "row",
      borderTop: "1pt solid black",
      borderBottom: "1pt solid black",
      backgroundColor: "#f0f0f0",
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1pt solid black",
      minHeight: 25,
    },
    tableCell: {
      padding: 4,
      borderRight: "1pt solid black",
      fontSize: 10,
      textAlign: "center",
      justifyContent: "center",
    },
    tableCellSNo: {
      width: "8%",
    },
    tableCellDesc: {
      width: "35%",
      textAlign: "left",
    },
    tableCellCost: {
      width: "20%",
    },
    tableCellJust: {
      width: "37%",
      textAlign: "left",
    },
    tableCellHeader: {
      fontFamily: "Times-Bold",
      fontSize: 11,
    },
    financialSection: {
      marginBottom: 15,
    },
    financialText: {
      marginBottom: 8,
    },
    signatureSection: {
      marginTop: 20,
    },
    signatureRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
    },
    signature: {
      textAlign: "center",
      width: "45%",
    },
    signatureLabel: {
      fontFamily: "Times-Roman",
      fontSize: 10,
    },
    approvalSection: {
      marginTop: 25,
      fontSize: 11,
    },
    approvalItem: {
      marginBottom: 15,
    },
    approvalHeader: {
      fontFamily: "Times-Bold",
      textAlign: "center",
      marginBottom: 10,
    },
    lastRow: {
      borderBottom: "none",
    },
  });

  // Prepare expenditure items with empty rows to make total of 8
  const expenditureRows = [...formData.expenditureItems || []];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title1}>PUNJAB ENGINEERING COLLEGE</Text>
          <Text style={styles.title2}>(Deemed to be University)</Text>
          <Text style={styles.title2}>
            PERFORMA FOR EVENT PERMISSION AND FINANCIAL SANCTION BY
          </Text>
          <Text style={styles.title2}>CLUBS/SOCIETIES/SPORTS DEPARTMENT</Text>
        </View>

        {/* Event Details Section */}
        <View style={styles.formSection}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Name of Club/Technical Society:</Text>
            <Text style={styles.fieldValue}>{formData.clubName || ""}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Event Name:</Text>
            <Text style={styles.fieldValue}>{formData.eventName || ""}</Text>
          </View>

          <View style={styles.multiFieldRow}>
            <View style={styles.multiField}>
              <Text style={styles.multiFieldLabel}>Date:</Text>
              <Text style={styles.multiFieldValue}>{formatDate(formData.eventDate)}</Text>
            </View>
            <View style={styles.multiField}>
              <Text style={styles.multiFieldLabel}>Venue(s):</Text>
              <Text style={styles.multiFieldValue}>{formData.venue || ""}</Text>
            </View>
            <View style={styles.multiField}>
              <Text style={styles.multiFieldLabel}>Time:</Text>
              <Text style={[styles.multiFieldValue, { marginRight: 0 }]}>{formatTime(formData.time)}</Text>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Brief Event Description:</Text>
            <Text style={styles.fieldValue}>{formData.eventDescription || ""}</Text>
          </View>

          <View style={styles.yesNoRow}>
            <Text style={styles.yesNoText}>
              Have the details of the event signed by Club Secretary attached alongwith the sanction?
            </Text>
            <Text style={styles.yesNoAnswer}>{formData.detailsSigned || "NO"}</Text>
          </View>
        </View>

        <View style={styles.permissionText}>
          <Text>Permission may please be granted for conducting above mentioned event.</Text>
        </View>

        {/* Expenditure Details */}
        <View style={styles.expenditureHeader}>
          <Text>EXPENDITURE DETAILS (Enter NIL if no funding required)</Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={[styles.tableCell, styles.tableCellSNo, styles.tableCellHeader]}>
              <Text>S. No.</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellDesc, styles.tableCellHeader]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellCost, styles.tableCellHeader]}>
              <Text>Approx. Cost</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellJust, styles.tableCellHeader, { borderRight: "none" }]}>
              <Text>Justification</Text>
            </View>
          </View>

          {/* Table Rows */}
          {expenditureRows.map((item, index) => (
            <View key={index} style={[styles.tableRow]}>
              <View style={[styles.tableCell, styles.tableCellSNo]}>
                <Text>{index + 1}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellDesc]}>
                <Text>{item.description || ""}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellCost]}>
                <Text>{item.cost ? `₹${item.cost}` : ""}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellJust, { borderRight: "none" }]}>
                <Text>{item.justification || ""}</Text>
              </View>
            </View>
          ))}


          {/* Total Row */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellSNo]}></View>
            <View style={[styles.tableCell, styles.tableCellDesc, styles.tableCellHeader]}>
              <Text>TOTAL</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellCost, styles.tableCellHeader]}>
              <Text>{formData.totalAmount > 0 ? `₹${formData.totalAmount.toFixed(2)}` : ""}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellJust, { borderRight: "none" }]}></View>
          </View>
        </View>

        {/* Financial Sanction Text */}
        <View style={styles.financialSection}>
          <View style={styles.financialText}>
            <Text>
              Financial Sanction may kindly be accorded for Rs.{" "}
              <Text style={{ borderBottom: "1pt solid black", paddingBottom: 2 }}>
                {formData.totalAmount > 0 ? formData.totalAmount.toFixed(2) : "________"}
              </Text>
              {" "}as per the above details.
            </Text>
          </View>
          <View style={styles.financialText}>
            <Text>
              The expenditure will be met out from the{" "}
              <Text style={{ borderBottom: "1pt solid black", paddingBottom: 2 }}>
                {formData.fundSource || "________________"}
              </Text>
              {" "}Fund.
            </Text>
          </View>
          <View style={styles.financialText}>
            <Text>
              An advance of Rs.{" "}
              <Text style={{ borderBottom: "1pt solid black", paddingBottom: 2 }}>
                {formData.advanceAmount || "________"}
              </Text>
              {" "}against this sanction may be given in the name of{" "}
              <Text style={{ borderBottom: "1pt solid black", paddingBottom: 2 }}>
                {formData.recipientName || "________________"}
              </Text>
            </Text>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureRow}>
            <View style={styles.signature}>
              <Text style={styles.signatureLabel}>(Name & Signatures of Club Secretary)</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signatureLabel}>(Name & Signatures of CCS/CTS/Sports Secy.)</Text>
            </View>
          </View>
        </View>

        {/* Approval Section */}
        <View style={styles.approvalSection}>
          <Text style={styles.approvalHeader}>EVENT DETAILS & EXPENDITURE HAS BEEN VERIFIED</Text>

          <View style={styles.approvalItem}>
            <Text>1. O/I Club/Technical Societies</Text>
            <Text>   Recommended/Not Recommended</Text>
          </View>

          <View style={styles.approvalItem}>
            <Text>2. ADSA(C)</Text>
            <Text>   Entered in Clubs/Societies Register at Page No. ________</Text>
            <Text>   Verified by Clerk, DSA Office</Text>
          </View>

          <View style={styles.approvalItem}>
            <Text>   Sanction/Not Sanctioned</Text>
            <Text style={{ textAlign: "right", marginTop: 10 }}>Dean Students Affairs</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Sanction;