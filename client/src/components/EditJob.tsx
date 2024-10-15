// src/components/EditJob.tsx

import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { Job, Room } from "../interfaces";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Grid,
  GridItem,
  Heading,
  VStack,
  Spinner,
  Text,
  useToast,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import MultiOptionToggle from "./MultiOptionToggle"; // Import MultiOptionToggle

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  // Options available for the job options field
  const availableOptions = ["New Windows", "Refurb", "PVC"];

  // Define Planning Permission options
  const planningPermissionOptions = [
    { label: "No Planning", value: "" },
    { label: "Conservation Area", value: "Conservation Area" },
    { label: "Category A", value: "Conservation Area: category A" },
    { label: "Category B", value: "Conservation Area: category B" },
    { label: "Category C", value: "Conservation Area: category C" },
  ];

  // Define Formation options
  const formationOptions = [
    { label: "1/1", value: "1/1" },
    { label: "2/1", value: "2/1" },
    { label: "2/2", value: "2/2" },
    { label: "1/2", value: "1/2" },
    { label: "3/1", value: "3/1" },
    { label: "3/2", value: "3/2" },
    { label: "3/3", value: "3/3" },
  ];

  // Glass Type options
  const glassTypeOptions = [
    { label: "Clear", value: "Clear" },
    { label: "Toughened", value: "Toughened" },
    { label: "Obscured", value: "Obscured" },
    { label: "Laminated", value: "Laminated" },
    { label: "Fineo", value: "Fineo" },
  ];

  // Fetch the job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get<Job>(`/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to fetch job details.");
        toast({
          title: "Error",
          description: "Failed to fetch job details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, toast]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!job) return;

    try {
      await axiosInstance.put(`/api/jobs/${id}`, job);
      toast({
        title: "Job Updated",
        description: "The job has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/viewSingle/${id}`);
    } catch (err) {
      console.error("Error updating job:", err);
      toast({
        title: "Error",
        description: "Failed to update job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handler for Job input changes
  const handleJobChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? checked : value;
    if (job) {
      setJob({ ...job, [name]: val });
    }
  };

  // Refactored Handler for Room input changes
  const handleRoomChange = (index: number, name: string, value: any) => {
    if (job) {
      const updatedRooms = job.rooms.map((room, i) =>
        i === index ? { ...room, [name]: value } : room
      );
      setJob({ ...job, rooms: updatedRooms });
    }
  };

  // Function to add a new room
  const addRoom = () => {
    if (job) {
      const newRoom: Room = {
        ref: "",
        roomName: "",
        width: 0,
        height: 0,
        count: 0,
        putty: false,
        mastic: false,
        paint: false,
        tenon: false,
        eC: false,
        encapsulation: 0,
        bottomRail: false,
        dormer: false,
        easyClean: false, // Added field
        pullyWheel: false, // Added field
        panesNumber: 0,
        stainRepairs: 0,
        cill: "",
        sash: "",
        notes: "",
        formation: "",
        glassType: "Clear", // Added field with default value
        casement: false,
        priceChange: 0,
        priceChangeNotes: "",
        masticPatch: false,
        outsidePatch: false,
        concealedVent: false,
        shutters: false,
      };
      setJob({ ...job, rooms: [...job.rooms, newRoom] });
    }
  };

  // Function to remove a room by index
  const removeRoom = (index: number) => {
    if (job) {
      const updatedRooms = job.rooms.filter((_, i) => i !== index);
      setJob({ ...job, rooms: updatedRooms });
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading job details...</Text>
      </Box>
    );

  if (error || !job)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">{error || "Job not found."}</Text>
      </Box>
    );

  return (
    <>
      <Navbar />
      {/* Main Container with Green Background */}
      <Box
        maxW="800px"
        mx="auto"
        p={6}
        bg="#B5C9BD" // Green background
        minH="100vh"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Edit Job
        </Heading>
        {/* Form Container with White Background */}
        <Box
          bg="#B5C9BD" // Match the background color
          p={6}
          borderRadius="md"
          boxShadow="sm"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {/* Job Fields */}
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={job.date}
                  onChange={handleJobChange}
                  bg="white" // White background
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Completed</FormLabel>
                <Checkbox
                  name="completed"
                  isChecked={job.completed}
                  onChange={handleJobChange}
                >
                  Is Completed
                </Checkbox>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  name="customerName"
                  value={job.customerName}
                  onChange={handleJobChange}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={job.email}
                  onChange={handleJobChange}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={job.phone}
                  onChange={handleJobChange}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="address"
                  value={job.address}
                  onChange={handleJobChange}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Postcode</FormLabel>
                <Input
                  type="text"
                  name="postCode"
                  value={job.postCode}
                  onChange={handleJobChange}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Planning Permission</FormLabel>
                <MultiOptionToggle
                  options={planningPermissionOptions}
                  value={job.planningPermission}
                  onChange={(val) =>
                    setJob({ ...job, planningPermission: val })
                  }
                  bg="white" // Set background to white
                />
              </FormControl>
              <FormControl>
                <FormLabel>Options</FormLabel>
                <Stack direction="row" spacing={4}>
                  {availableOptions.map((option) => (
                    <Button
                      key={option}
                      colorScheme="teal" // Use the same color scheme (teal) for consistency
                      variant={
                        job.options.includes(option) ? "solid" : "outline"
                      } // Solid style when selected, outline when not
                      onClick={() => {
                        let newOptions = [...job.options];
                        if (newOptions.includes(option)) {
                          newOptions = newOptions.filter(
                            (opt) => opt !== option
                          ); // Remove if already selected
                        } else {
                          newOptions.push(option); // Add if not selected
                        }
                        setJob({ ...job, options: newOptions }); // Update the job state
                      }}
                      size="md" // Ensure the button size matches the rest of the form
                      borderRadius="md" // Match border-radius style with other form elements
                      _focus={{ boxShadow: "outline" }} // Keep the same focus style as inputs
                    >
                      {option}
                    </Button>
                  ))}
                </Stack>
              </FormControl>

              {/* Rooms Section */}
              <Heading as="h3" size="md" mt={6}>
                Rooms
              </Heading>
              {job.rooms.map((room, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mt={4}
                  bg="white" // White background for room container
                  boxShadow="sm"
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    align="center"
                  >
                    <Heading as="h4" size="sm">
                      Room {index + 1}
                    </Heading>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeRoom(index)}
                    >
                      Delete Room
                    </Button>
                  </Stack>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                    mt={4}
                  >
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Ref</FormLabel>
                        <Input
                          type="text"
                          name="ref"
                          value={room.ref}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Room Name</FormLabel>
                        <Input
                          type="text"
                          name="roomName"
                          value={room.roomName}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Width</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.width}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "width",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="width"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Height</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.height}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "height",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="height"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Formation</FormLabel>
                        <Select
                          name="formation"
                          value={room.formation}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        >
                          <option value="">Select Formation</option>
                          {formationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Glass Type</FormLabel>
                        <Select
                          name="glassType"
                          value={room.glassType}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        >
                          {glassTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Count</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.count}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "count",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="count"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>New Panes</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.panesNumber}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "panesNumber",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="panesNumber"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Stain Repairs</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.stainRepairs}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "stainRepairs",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="stainRepairs"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Encapsulation</FormLabel>
                        <NumberInput
                          min={0}
                          value={room.encapsulation}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "encapsulation",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="encapsulation"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    {/* Cill Field */}
                    <GridItem>
                      <FormControl>
                        <FormLabel>Cill</FormLabel>
                        <MultiOptionToggle
                          options={[
                            { label: "None", value: "" },
                            { label: "Full", value: "Full" },
                            { label: "Half", value: "Half" },
                            { label: "Repairs", value: "Repairs" },
                          ]}
                          value={room.cill}
                          onChange={(val) =>
                            handleRoomChange(index, "cill", val)
                          }
                        />
                      </FormControl>
                    </GridItem>

                    {/* Sash Field */}
                    <GridItem>
                      <FormControl>
                        <FormLabel>Sash</FormLabel>
                        <MultiOptionToggle
                          options={[
                            { label: "None", value: "" },
                            { label: "Top", value: "Top" },
                            { label: "Bottom", value: "Bottom" },
                            { label: "Both", value: "Both" },
                          ]}
                          value={room.sash}
                          onChange={(val) =>
                            handleRoomChange(index, "sash", val)
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Price Change (%)</FormLabel>
                        <NumberInput
                          min={-100}
                          step={5}
                          value={room.priceChange}
                          onChange={(valueString) =>
                            handleRoomChange(
                              index,
                              "priceChange",
                              Number(valueString)
                            )
                          }
                        >
                          <NumberInputField
                            name="[priceChange]"
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Price Change Notes</FormLabel>
                        <Input
                          type="text"
                          name="priceChangeNotes"
                          value={room.priceChangeNotes}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl>
                        <FormLabel>Notes</FormLabel>
                        <Textarea
                          name="notes"
                          value={room.notes}
                          onChange={(e) =>
                            handleRoomChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Box mt={4}>
                    <Heading as="h5" size="sm" mb={2}>
                      Options
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                      <Checkbox
                        name="easyClean"
                        isChecked={room.easyClean}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Easy Clean
                      </Checkbox>
                      <Checkbox
                        name="dormer"
                        isChecked={room.dormer}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Dormer
                      </Checkbox>

                      <Checkbox
                        name="mastic"
                        isChecked={room.mastic}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Mastic
                      </Checkbox>
                      <Checkbox
                        name="masticPatch"
                        isChecked={room.masticPatch}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Mastic Patch
                      </Checkbox>
                      <Checkbox
                        name="putty"
                        isChecked={room.putty}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Putty
                      </Checkbox>
                      <Checkbox
                        name="paint"
                        isChecked={room.paint}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Paint
                      </Checkbox>
                      <Checkbox
                        name="tenon"
                        isChecked={room.tenon}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Tenon
                      </Checkbox>
                      <Checkbox
                        name="eC"
                        isChecked={room.eC}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        EC
                      </Checkbox>
                      <Checkbox
                        name="bottomRail"
                        isChecked={room.bottomRail}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Bottom Rail
                      </Checkbox>

                      <Checkbox
                        name="pullyWheel"
                        isChecked={room.pullyWheel}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Pully Wheel
                      </Checkbox>
                      <Checkbox
                        name="casement"
                        isChecked={room.casement}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Casement
                      </Checkbox>

                      <Checkbox
                        name="concealedVent"
                        isChecked={room.concealedVent}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Concealed Vent
                      </Checkbox>

                      <Checkbox
                        name="outsidePatch"
                        isChecked={room.outsidePatch}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Outside Facing Patch
                      </Checkbox>

                      <Checkbox
                        name="shutters"
                        isChecked={room.shutters}
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            e.target.name,
                            e.target.checked
                          )
                        }
                        size="md"
                        colorScheme="teal"
                      >
                        Shutter Repairs
                      </Checkbox>
                    </SimpleGrid>
                  </Box>
                </Box>
              ))}
              <Button
                mt={4}
                onClick={addRoom}
                colorScheme="teal"
                variant="outline"
              >
                Add Room
              </Button>
              {/* Submit Button */}
              <Button type="submit" colorScheme="teal" size="lg" mt={6}>
                Update Job
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default EditJob;
