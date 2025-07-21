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
  { name: "Create Quote Ipad", to: "/createIpad" },
  { name: "View Quotes", to: "/viewAll" },
];

// --- Texture and Gradient Styles ---
const navbarStyles = `
.navbar-texture {
  position: relative;
  background: linear-gradient(110deg, #5c9385 0%, #8ec7b7 100%);
  box-shadow: 0 4px 18px 0 rgba(60,70,70,0.11);
  z-index: 10;
  overflow: hidden;
}
.navbar-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Subtle glassy overlay with white diagonal streaks and noise */
  background: 
    linear-gradient(120deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%),
    url('https://www.transparenttextures.com/patterns/natural-paper.png');
  opacity: 0.23;
  z-index: 1;
}
.navbar-content {
  position: relative;
  z-index: 2;
}
`;

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      <style>{navbarStyles}</style>
      <Box className="navbar-texture" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} className="navbar-content">
          {/* Hamburger Menu for Mobile */}
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            bg="rgba(255,255,255,0.10)"
            _hover={{ bg: "rgba(255,255,255,0.16)" }}
            zIndex={5}
          />
          {/* Logo or Brand Name */}
          <HStack spacing={8} alignItems={"center"}>
            <Box color="white"  fontFamily="Karrie, Arial, sans-serif" fontWeight="bold" fontSize="lg" letterSpacing="1px" style={{textShadow:"0 2px 8px rgba(40,80,80,0.12)"}}>
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
                    boxShadow: "0 2px 8px 0 rgba(60,100,100,0.10)"
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
          <Box pb={4} display={{ md: "none" }} className="navbar-content">
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
