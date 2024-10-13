// src/components/Register.tsx
import React, { useState } from "react";
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

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.error || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
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
          Register
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
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
              Register
            </Button>
            <Text>
              Already have an account?{" "}
              <Button variant="link" colorScheme="teal" as={RouterLink} to="/login">
                Login here
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
