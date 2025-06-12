// src/components/Home.tsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './NavBar';
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      {/* Main Container with Green Background */}
      <Box
        bg="#B5C9BD" // Green background
        minH="100vh"
        py={10}
        px={4}
      >
        {/* Content Wrapper */}
        <Flex
          direction="column"
          align="center"
          maxW="1200px"
          mx="auto"
        >
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            textAlign="center"
            color="gray.800"
          >
            Welcome to Preservation Quotes TEST
          </Heading>
          <Box
            padding="30px" // Add 20px padding
          >
            
          </Box>



          {/* Box Links Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
            {/* Create Quote Box */}
            <LinkBox
              as="div"
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)', transition: '0.3s' }}
              cursor="pointer"
            >
              <Flex direction="column" align="center" textAlign="center">
                {/* Icon */}
                {/* <AddIcon w={12} h={12} color="teal.500" mb={4} /> */}

                {/* Link Overlay */}
                <LinkOverlay as={RouterLink} to="/create">
                  <Heading as="h3" size="lg" mb={2} color="gray.800">
                    Create a New Quote
                  </Heading>
                </LinkOverlay>

                {/* Description */}
                <Text color="gray.600">
                  Upload site measurements to create a Quote PDF, and enter the job details into the system.
                </Text>

                {/* CTA Button */}
                <Flex direction="row">
                <Button
                  mt={6}
                  colorScheme="teal"
                  variant="solid"
                  marginRight={3}
                  as={RouterLink}
                  to="/create"
                  leftIcon={<AddIcon />}
                >
                  Desktop
                </Button>
                <Button
                  mt={6}
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

            {/* View Quotes Box */}
            <LinkBox
              as="div"
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)', transition: '0.3s' }}
              cursor="pointer"
            >
              <Flex direction="column" align="center" textAlign="center">
                {/* Icon */}
                {/* <ViewIcon w={12} h={12} color="teal.500" mb={4} /> */}

                {/* Link Overlay */}
                <LinkOverlay as={RouterLink} to="/viewAll">
                  <Heading as="h3" size="lg" mb={2} color="gray.800">
                    View Existing Quotes
                  </Heading>
                </LinkOverlay>

                {/* Description */}
                <Text color="gray.600">
                  Browse through all your existing quotes. Easily view, edit, or delete quotes as needed to manage your projects efficiently.
                </Text>

                {/* CTA Button */}
                <Button
                  mt={6}
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
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
