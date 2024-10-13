// src/components/Login.tsx
import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./NavBar";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/viewAll");
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.error || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Navbar />
    <Box
      bg="#B5C9BD"
      minH="100vh"
      py={10}
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width={{ base: "100%", sm: "400px" }}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
            <Text>
              Don't have an account?{" "}
              <Button variant="link" colorScheme="teal" as={RouterLink} to="/register">
                Register here
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
    </>
  );
};

export default Login;
