// src/components/Navbar.tsx
import React, { useContext } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Links = [
  { name: "Home", to: "/" },
  { name: "Create Quote", to: "/create" },
  { name: "View Quotes", to: "/viewAll" },
  {name: "Ipad", to: "/createIpad" },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      <Box bg="#74A69A" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {/* Logo or Brand Name */}
          <HStack spacing={8} alignItems={"center"}>
            <Box color="white" fontWeight="bold" fontSize="lg">
              Preservation Quotes
            </Box>
            {/* Links */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={RouterLink}
                  to={link.to}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "teal.500",
                  }}
                  color="white"
                >
                  {link.name}
                </ChakraLink>
              ))}
            </HStack>
          </HStack>
          {/* Authentication Buttons */}
          <Flex alignItems={"center"}>
            {isAuthenticated ? (
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  variant={"outline"}
                  colorScheme={"teal"}
                  size={"sm"}
                >
                  Register
                </Button>
              </>
            )}
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={RouterLink}
                  to={link.to}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "teal.500",
                  }}
                  color="white"
                  onClick={onClose}
                >
                  {link.name}
                </ChakraLink>
              ))}
              {isAuthenticated ? (
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    as={RouterLink}
                    to="/login"
                    variant={"solid"}
                    colorScheme={"teal"}
                    size={"sm"}
                    onClick={onClose}
                  >
                    Login
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/register"
                    variant={"outline"}
                    colorScheme={"teal"}
                    size={"sm"}
                    onClick={onClose}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
