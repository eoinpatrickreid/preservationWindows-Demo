// src/components/TemporaryFormation.tsx

import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./NavBar";


const TemporaryFormation: React.FC = () => {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const toast = useToast();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!name || !imageFile) {
        toast({
          title: "Error",
          description: "Please provide a name and select an image.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", imageFile);
  
        await axiosInstance.post("/api/temps", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        toast({
          title: "Success",
          description: "Image uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        // Reset the form
        setName("");
        setImageFile(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error",
          description: "Failed to upload image.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <>
        <Navbar />
        <Box maxW="500px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Upload Temporary Formation Image
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Image File</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  border="none"
                  paddingLeft="0"
                />
              </FormControl>
  
              <Button type="submit" colorScheme="teal" size="lg" mt={6}>
                Upload Image
              </Button>
            </VStack>
          </form>
        </Box>
      </>
    );
  };
  
  export default TemporaryFormation;
  