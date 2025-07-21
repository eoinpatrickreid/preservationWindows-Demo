import React from 'react';
import Navbar from './NavBar';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Stack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';

const sectionAccent = "#74A69A";

const Home: React.FC = () => {
  // For offsetting cards on large screens

  return (
    <>
      <Navbar />
      <Box
  minH="100vh"
  pb={10}
  sx={{
    width: "100%",
    filter: "contrast(100%) brightness(100%)",
    background: `
      linear-gradient(100deg, #65AD7A, rgba(0,0,0,0)),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.39' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
    `,
    backgroundBlendMode: "lighten, normal",
    backgroundSize: "cover, cover"
  }}
>
        {/* HERO */}
        <Flex
          minH={{ base: "10vh", md: "20vh" }}
          align="center"
          justify="center"
          px={4}
          pt={{ base: 5, md: 10 }}
          pb={{ base: 5, md: 10 }}
        >
          <Box
            maxW="660px"
            w="100%"
            bg="white"
            borderRadius="2xl"
            boxShadow="0 8px 44px 0 rgba(100,120,120,0.13)"
            px={{ base: 5, md: 10 }}
            py={{ base: 8, md: 14 }}
            textAlign="center"
            borderLeft="6px solid"
            borderColor={sectionAccent}
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "2.7rem" }}
              mb={4}
              color="#274536"
              fontFamily="Karrie, Arial, sans-serif"
              letterSpacing="-1px"
            >
              Welcome to Preservation Quotes Demo
            </Heading>
            <Text fontSize={{ base: "md", md: "1.17rem" }} color="#51574D" mb={2}>
              Effortlessly create, manage, and export detailed quotes for trades projects - tailored for preservation specialists.
            </Text>
          </Box>
        </Flex>

        {/* CONTENT SECTIONS */}
        <Stack
          spacing={{ base: 1, md: 3 }}
          maxW="900px"
          mx="auto"
          px={2}
          mt={2}
        >
          {/* Purpose */}
          <Box
            maxW="650px"
            ml={{ base: 0, lg: 0 }}
            mr={{ base: 0, lg: "auto" }}
            bg="rgba(255,255,255,0.97)"
            borderRadius="2xl"
            boxShadow="0 4px 28px 0 rgba(60,70,70,0.08)"
            px={{ base: 5, md: 8 }}
            py={{ base: 7, md: 10 }}
            borderLeft="6px solid"
            borderColor={sectionAccent}
          >
            <Heading fontSize="1.4rem" color="#274536" mb={3} fontFamily="Karrie, Arial, sans-serif">
              Site Purpose
            </Heading>
            <Text color="#51574D" fontSize={{ base: "md", md: "1.08rem" }}>
              Preservation Quotes is designed to eliminate tedious, repetitive, time-consuming processes from trades companies workflows. <br/><br/>
            By simply entering the site measurements for a job - users can perform all cost calculations and generate attractive branded PDF quotes to send to prospective clients.
            <br/><br/>Job's are then stored in the system allowing users to view, edit, duplicate, and delete as needed. This demo showcases the core functionality of the site which can be adapted to any trades business that requires quoting and job management.
            </Text>
          </Box>
          {/* Tech Stack */}
          <Box
            maxW="650px"
            mr={{ base: 0, lg: 0 }}
            ml={{ base: 0, lg: "auto" }}
            bg="rgba(255,255,255,0.97)"
            borderRadius="2xl"
            boxShadow="0 4px 28px 0 rgba(60,70,70,0.08)"
            px={{ base: 5, md: 8 }}
            py={{ base: 7, md: 10 }}
            borderRight={{ base: "none", lg: "6px solid" }}
            borderColor={{ base: "transparent", lg: sectionAccent }}
          >
            <Heading fontSize="1.4rem" color="#274536" mb={3} fontFamily="Karrie, Arial, sans-serif">
              Tech Stack
            </Heading>
            <Box color="#51574D" fontSize={{ base: "md", md: "1.08rem" }}>
              <ul style={{ margin: "10px 0 0 20px", padding: 0 }}>
                <li><b>Frontend:</b> React, Vite, Chakra UI, TypeScript</li>
                <li><b>Backend:</b> Go (Golang) with Fiber</li>
                <li><b>Database:</b> MongoDB</li>
              </ul>
            </Box>
          </Box>
          {/* Functionality */}
          <Box
            maxW="650px"
            ml={{ base: 0, lg: "60px" }}
            mr={{ base: 0, lg: "auto" }}
            bg="rgba(255,255,255,0.97)"
            borderRadius="2xl"
            boxShadow="0 4px 28px 0 rgba(60,70,70,0.08)"
            px={{ base: 5, md: 8 }}
            py={{ base: 7, md: 10 }}
            borderLeft="6px solid"
            borderColor={sectionAccent}
          >
            <Heading fontSize="1.4rem" color="#274536" mb={3} fontFamily="Karrie, Arial, sans-serif">
              Functionality
            </Heading>
            <Box color="#51574D" fontSize={{ base: "md", md: "1.08rem" }}>
              <ul style={{ margin: "0 0 0 20px", padding: 0 }}>
                <li><b>Create Quotes:</b> <br/> Fill in site and customer info to generate a client PDF instantly. Designed based on the companies current measurements sheet, making the switch to digital efficient and reducing entry errors.</li>
                <br/>
                <li><b>View Quotes:</b> <br/> See all your current and past quotes in one place. Allows for sorting jobs and efficient search by name and address.</li>
                <br/>
                <li><b>View Quote:</b> <br/> View individual quotes, displaying generated exportable PDFs - allows users to edit, delete, and duplicate jobs. </li>

              </ul>
            </Box>
          </Box>
        </Stack>

        {/* BUTTON SECTION */}
        <Box maxW="900px" mx="auto" pt={12} px={2}>
          <Flex justify="center" gap={8} flexWrap="wrap">
            <LinkBox as="div" className="home-linkbox" minW="270px" flex={1} m={2}
              bg="white" borderRadius="xl" boxShadow="0 4px 16px rgba(100, 120, 100, 0.08)"
              border="1.5px solid rgba(188, 200, 180, 0.12)" p={8}
              _hover={{ boxShadow: "0 8px 28px rgba(40,80,80,0.15)", transform: "translateY(-2px) scale(1.01)" }}
              transition="all 0.18s cubic-bezier(.75,0,.2,1.05)"
            >
              <Flex direction="column" align="center" textAlign="center">
                <LinkOverlay as={RouterLink} to="/create">
                  <Heading as="h3" size="lg" mb={2} color="#274536" fontFamily="Karrie, Arial, sans-serif">
                    Create a New Quote
                  </Heading>
                </LinkOverlay>
                <Text color="#66706b" mb={4}>
                  Upload site measurements to create a Quote PDF, and enter the job details into the system.
                </Text>
                <Flex direction={{ base: "column", md: "row" }} gap={3} mt={2}>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    as={RouterLink}
                    to="/create"
                    leftIcon={<AddIcon />}
                  >
                    Desktop
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    as={RouterLink}
                    to="/createIpad"
                    leftIcon={<AddIcon />}
                  >
                    Ipad
                  </Button>
                </Flex>
              </Flex>
            </LinkBox>
            <LinkBox as="div" className="home-linkbox" minW="270px" flex={1} m={2}
              bg="white" borderRadius="xl" boxShadow="0 4px 16px rgba(100, 120, 100, 0.08)"
              border="1.5px solid rgba(188, 200, 180, 0.12)" p={8}
              _hover={{ boxShadow: "0 8px 28px rgba(40,80,80,0.15)", transform: "translateY(-2px) scale(1.01)" }}
              transition="all 0.18s cubic-bezier(.75,0,.2,1.05)"
            >
              <Flex direction="column" align="center" textAlign="center">
                <LinkOverlay as={RouterLink} to="/viewAll">
                  <Heading as="h3" size="lg" mb={2} color="#274536" fontFamily="Karrie, Arial, sans-serif">
                    View Existing Quotes
                  </Heading>
                </LinkOverlay>
                <Text color="#66706b" mb={4}>
                  Browse through all your existing quotes. Easily view, edit, or delete quotes as needed to manage your projects efficiently.
                </Text>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  as={RouterLink}
                  to="/viewAll"
                  leftIcon={<ViewIcon />}
                >
                  View Quotes
                </Button>
              </Flex>
            </LinkBox>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
