import { Job, Room } from "../interfaces";

const DUMMY_ROOMS: Room[] = [
  {
    ref: "A01",
    roomName: "Living Room",
    width: 120,
    height: 150,
    count: 2,
    putty: true,
    mastic: false,
    masticPatch: false,
    paint: true,
    tenon: false,
    eC: false,
    encapsulation: 0,
    bottomRail: true,
    dormer: false,
    easyClean: true,
    pullyWheel: true,
    panesNumber: 2,
    stainRepairs: 0,
    cill: "Standard",
    sash: "Double",
    notes: "Needs repainting",
    formation: "Box",
    glassType: "Double Glazed",
    glassTypeTopBottom: "Top: Float, Bottom: Toughened",
    casement: false,
    outsidePatch: false,
    concealedVent: false,
    trickleVent: true,
    shutters: false,
    handles: true,
    priceChange: 0,
    priceChange2: "",
    positiveNegative: "+",
    priceChangeNotes: "",
    customFormation: "",
    customItem: false,
    customItemText: "",
    customItem2: 0,
    quoteNotes: "",
    windowNotes: "Ensure proper sealing",
  },
  {
    ref: "B02",
    roomName: "Bedroom 1",
    width: 100,
    height: 120,
    count: 1,
    putty: false,
    mastic: true,
    masticPatch: true,
    paint: false,
    tenon: true,
    eC: false,
    encapsulation: 1,
    bottomRail: false,
    dormer: false,
    easyClean: false,
    pullyWheel: false,
    panesNumber: 1,
    stainRepairs: 2,
    cill: "Custom",
    sash: "Single",
    notes: "",
    formation: "Bay",
    glassType: "Single Glazed",
    glassTypeTopBottom: "",
    casement: true,
    outsidePatch: true,
    concealedVent: true,
    trickleVent: false,
    shutters: false,
    handles: false,
    priceChange: 15,
    priceChange2: "Add-on",
    positiveNegative: "-",
    priceChangeNotes: "Difficult access",
    customFormation: "",
    customItem: true,
    customItemText: "Custom arch detail",
    customItem2: 1,
    quoteNotes: "Customer prefers matte finish",
    windowNotes: "",
  },
  // Add more Room objects as you wish!
];

const DUMMY_JOB: Job = {
  _id: "dummy-job-001",
  quoteId: 1001,
  completed: false,
  date: "2025-07-24",
  customerName: "Jane Example",
  address: "10 Market Street, Sampletown",
  email: "jane@example.com",
  phone: "01234 567890",
  postCode: "AB12 3CD",
  rooms: DUMMY_ROOMS,
  options: ["New Windows", "Refurb", "PVC"],
  planningPermission: "Not required",
  siteNotes: "Parking at rear. Ladder needed for rear windows.",
  addressLineOne: "10 Market Street",
  addressLineTwo: "",
  addressLineThree: "Sampletown",
};

import React, { useEffect, useState } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import Navbar from "./NavBar";
import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import NewWindowsPDF from "./pdfs/NewWindowsPDF";
import RefurbPDF from "./pdfs/RefurbPDF";
import PVCPDF from "./pdfs/PVCPDF";

const pdfComponents: { [key: string]: React.FC<{ job: Job }> } = {
  "New Windows": NewWindowsPDF,
  Refurb: RefurbPDF,
  PVC: PVCPDF,
};

const ViewSingleDemo: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDownloadingMap, setIsDownloadingMap] = useState<{ [option: string]: boolean }>({});

  useEffect(() => {
    setTimeout(() => {
      setJob(DUMMY_JOB);
      setLoading(false);
    }, 500);
  }, []);

  // Fake navigate (or use react-router for real demo)
  const navigate = (to: string) => {
    toast({
      title: "Navigation",
      description: `Would navigate to: ${to}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Delete action
  const handleDelete = async () => {
    onOpen();
  };

  // Duplicate action
  const handleDuplicate = async () => {
    toast({
      title: "Job Duplicated",
      description: "The job has been duplicated (simulated).",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text>Loading job data...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

  if (!job)
    return (
      <Box textAlign="center" mt={10}>
        <Text>No job data available.</Text>
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box maxW="1000px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          View Quote
        </Heading>
        {job.options.map((option, index) => {
          const PDFComponent = pdfComponents[option];
          if (PDFComponent) {
            return (
              <Box
                key={index}
                width="100%"
                height={{ base: "50vh", md: "70vh" }}
                mb={6}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                overflow="hidden"
              >
                <Heading as="h3" size="md" mb={4} textAlign="center">
                  {option} Quote
                </Heading>
                <PDFViewer width="100%" height="100%">
                  <PDFComponent job={job} />
                </PDFViewer>
              </Box>
            );
          }
          return null;
        })}

        <VStack spacing={4} align="stretch">
          <HStack spacing={4} justify="center">
            <Button colorScheme="teal" variant="solid" onClick={() => navigate(`/editJob/${job._id}`)}>
              Edit Quote
            </Button>

            <Button colorScheme="teal" variant="solid" onClick={handleDuplicate}>
              Duplicate Quote
            </Button>

            {job.options.map((option) => {
              const PDFComponent = pdfComponents[option];
              if (PDFComponent) {
                const isDownloading = isDownloadingMap[option] || false;

                const handleDownload = async () => {
                  setIsDownloadingMap((prev) => ({ ...prev, [option]: true }));
                  try {
                    const blob = await pdf(<PDFComponent job={job} />).toBlob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `${job.customerName.replace(/ /g, "_")}_${job.date}_${option}_QUOTE.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode?.removeChild(link);
                    URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error generating PDF:", error);
                  } finally {
                    setIsDownloadingMap((prev) => ({ ...prev, [option]: false }));
                  }
                };

                return (
                  <Button
                    key={option}
                    colorScheme="teal"
                    variant="outline"
                    isLoading={isDownloading}
                    onClick={handleDownload}
                  >
                    {isDownloading
                      ? `Generating ${option} PDF...`
                      : `Download ${option} PDF`}
                  </Button>
                );
              }
              return null;
            })}

            <Button colorScheme="red" variant="solid" onClick={handleDelete}>
              Delete Quote
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/viewAll");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Deleted Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The job has been successfully deleted.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                onClose();
                navigate("/viewAll");
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSingleDemo;
