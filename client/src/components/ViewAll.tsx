// src/components/ViewAll.tsx
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./NavBar";
import { Job } from "../interfaces";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useToast,
  LinkBox,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import axiosInstance from "../utils/axiosInstance";

const ViewAll: React.FC = () => {
  type SortField = "customerName" | "date" | "address";

  const [jobs, setJobs] = useState<Job[]>([] as Job[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Changed from "asc" to "desc"
  
  const [searchTerm, setSearchTerm] = useState<string>("");

  

  const toast = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/api/jobs");
        setJobs(response.data as Job[]);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch jobs.");
        toast({
          title: "Error",
          description: err.response?.data?.error || "Failed to fetch jobs.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const sortedJobs = [...jobs].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
  
    if (sortField === "date") {
      return sortOrder === "asc"
        ? new Date(fieldA as string).getTime() - new Date(fieldB as string).getTime()
        : new Date(fieldB as string).getTime() - new Date(fieldA as string).getTime();
    } else {
      return sortOrder === "asc"
        ? (fieldA as string).localeCompare(fieldB as string)
        : (fieldB as string).localeCompare(fieldA as string);
    }
  });

  const filteredJobs = sortedJobs.filter((job) => {
    const lowerSearch = searchTerm.toLowerCase();
  
    // Gather all address fields (old and new)
    const addressFields = [
      job.address ?? "",
      job.addressLineOne ?? "",
      job.addressLineTwo ?? "",
      job.addressLineThree ?? "",
      job.postCode ?? "",
    ].join(" ");
  
    return (
      job.customerName?.toLowerCase().includes(lowerSearch) ||
      addressFields.toLowerCase().includes(lowerSearch)
    );
  });
  

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading jobs...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

    function getJobAddress(job: Job): string {
      // If legacy address exists and not empty, use it
      if (job.address && job.address.trim() !== "") {
        return job.address + (job.postCode ? `, ${job.postCode}` : "");
      }
      // Otherwise, combine the new fields
      const addressLines = [
        job.addressLineOne,
        job.addressLineTwo,
        job.addressLineThree,
      ].filter(line => line && line.trim() !== "");
      let joined = addressLines.join(" ");
      if (job.postCode && job.postCode.trim() !== "") {
        joined += (joined ? ", " : "") + job.postCode;
      }
      return joined;
    }
    

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <Box
        maxW="1000px"
        mx="auto"
        p={6}
        bg="#B5C9BD" // Green background
        minH="100vh"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          All Quotes
        </Heading>

        {/* Search and Sorting Controls */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb={6}
          bg="white" // White background for controls
          p={4}
          borderRadius="md"
          boxShadow="sm"
        >
          {/* Search Input */}
          <InputGroup maxW={{ base: "100%", md: "300px" }} mb={{ base: 4, md: 0 }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or address"
              bg="white" // White background
              borderColor="gray.300"
              _focus={{ borderColor: "teal.400", boxShadow: "outline" }}
            />
          </InputGroup>

          {/* Sorting Controls */}
          <Flex align="center">
            <Text mr={2} fontWeight="medium">
              Sort By:
            </Text>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              maxW="150px"
              mr={2}
              bg="white" // White background
              borderColor="gray.300"
              _focus={{ borderColor: "teal.400", boxShadow: "outline" }}
            >
              <option value="date">Date</option>
              <option value="customerName">Name</option>
              <option value="address">Address</option>
            </Select>
            <IconButton
              aria-label="Sort Order"
              icon={<ArrowUpDownIcon />}
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              bg="white" // White background
              borderColor="gray.300"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200" }}
              borderWidth="1px"
            />
          </Flex>
        </Flex>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.700">
            No quotes found.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {filteredJobs.map((job) => (
              <LinkBox
                key={job._id}
                bg="white" // White background for job card
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                boxShadow="sm"
                _hover={{ boxShadow: "md", transform: "scale(1.02)", transition: "0.2s" }}
              >
                <VStack spacing={3} align="stretch">
                  <Heading as="h3" size="md" color="gray.800">
                    {job.customerName}
                  </Heading>
                  <Text color="gray.600">{getJobAddress(job)}</Text>
                  <Text color="gray.600">
                    {new Date(job.date).toLocaleDateString()}
                  </Text>
                  <Button
                    as={RouterLink}
                    to={`/viewSingle/${job._id}`}
                    colorScheme="teal"
                    size="sm"
                  >
                    View Quote
                  </Button>
                </VStack>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

export default ViewAll;
