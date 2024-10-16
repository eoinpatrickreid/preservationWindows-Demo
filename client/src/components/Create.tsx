// src/components/Create.tsx

import axiosInstance from "../utils/axiosInstance";
import React, { useRef, useState } from "react";
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
  Stack,
  Grid,
  GridItem,
  Heading,
  VStack,
  useToast,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MultiOptionToggle from "./MultiOptionToggle";

const RoomForm: React.FC<{
  roomIndex: number;
  removeRoom: (index: number) => void;
  roomRefs: React.MutableRefObject<Room[]>;
  formationOptions: { label: string; value: string }[];
  glassTypeOptions: { label: string; value: string }[];
}> = ({
  roomIndex,
  removeRoom,
  roomRefs,
  formationOptions,
  glassTypeOptions,
}) => {
  // Initialize room ref
  if (!roomRefs.current[roomIndex]) {
    roomRefs.current[roomIndex] = {
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
      easyClean: false,
      pullyWheel: false,
      panesNumber: 0,
      stainRepairs: 0,
      cill: "",
      sash: "",
      notes: "",
      formation: "",
      glassType: "Clear",
      casement: false,
      priceChange: 0,
      priceChangeNotes: "",
      masticPatch: false,
      outsidePatch: false,
      concealedVent: false,
      shutters: false,
    };
  }

  const room = roomRefs.current[roomIndex];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mt={4}
      bg="white"
      boxShadow="sm"
    >
      <Stack direction="row" justifyContent="space-between" align="center">
        <Heading as="h4" size="sm">
          Room {roomIndex + 1}
        </Heading>
        <Button size="sm" colorScheme="red" onClick={() => removeRoom(roomIndex)}>
          Delete Room
        </Button>
      </Stack>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mt={4}
      >
        {/* Ref */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Ref</FormLabel>
            <Input
              type="text"
              defaultValue={room.ref}
              onChange={(e) => (room.ref = e.target.value)}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Room Name */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Room Name</FormLabel>
            <Input
              type="text"
              defaultValue={room.roomName}
              onChange={(e) => (room.roomName = e.target.value)}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Width */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Width</FormLabel>
            <Input
              type="number"
              defaultValue={room.width}
              onChange={(e) => (room.width = parseFloat(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Height */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Height</FormLabel>
            <Input
              type="number"
              defaultValue={room.height}
              onChange={(e) => (room.height = parseFloat(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Formation */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Formation</FormLabel>
            <Select
              defaultValue={room.formation}
              onChange={(e) => (room.formation = e.target.value)}
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
        {/* Glass Type */}
        <GridItem>
          <FormControl>
            <FormLabel>Glass Type</FormLabel>
            <Select
              defaultValue={room.glassType}
              onChange={(e) => (room.glassType = e.target.value)}
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
        {/* Count */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Count</FormLabel>
            <Input
              type="number"
              defaultValue={room.count}
              onChange={(e) => (room.count = parseInt(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* New Panes */}
        <GridItem>
          <FormControl>
            <FormLabel>New Panes</FormLabel>
            <Input
              type="number"
              defaultValue={room.panesNumber}
              onChange={(e) => (room.panesNumber = parseInt(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Stain Repairs */}
        <GridItem>
          <FormControl>
            <FormLabel>Stain Repairs</FormLabel>
            <Input
              type="number"
              defaultValue={room.stainRepairs}
              onChange={(e) => (room.stainRepairs = parseInt(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Encapsulation */}
        <GridItem>
          <FormControl>
            <FormLabel>Encapsulation</FormLabel>
            <Input
              type="number"
              defaultValue={room.encapsulation}
              onChange={(e) => (room.encapsulation = parseInt(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Cill */}
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
              onChange={(val) => (room.cill = val)}
            />
          </FormControl>
        </GridItem>
        {/* Sash */}
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
              onChange={(val) => (room.sash = val)}
            />
          </FormControl>
        </GridItem>
        {/* Price Change (%) */}
        <GridItem>
          <FormControl>
            <FormLabel>Price Change (%)</FormLabel>
            <Input
              type="number"
              defaultValue={room.priceChange}
              onChange={(e) => (room.priceChange = parseFloat(e.target.value))}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Price Change Notes */}
        <GridItem>
          <FormControl>
            <FormLabel>Price Change Notes</FormLabel>
            <Input
              type="text"
              defaultValue={room.priceChangeNotes}
              onChange={(e) => (room.priceChangeNotes = e.target.value)}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
        {/* Notes */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea
              defaultValue={room.notes}
              onChange={(e) => (room.notes = e.target.value)}
              bg="white"
              _focus={{ bg: "white", boxShadow: "outline" }}
              boxShadow="sm"
              borderRadius="md"
              borderColor="gray.300"
            />
          </FormControl>
        </GridItem>
      </Grid>
      {/* Options */}
      <Box mt={4}>
        <Heading as="h5" size="sm" mb={2}>
          Options
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
          {/* Example Checkbox */}
          <Checkbox
            defaultChecked={room.easyClean}
            onChange={(e) => (room.easyClean = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Easy Clean
          </Checkbox>
          <Checkbox
            defaultChecked={room.dormer}
            onChange={(e) => (room.dormer = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Dormer
          </Checkbox>
          <Checkbox
            defaultChecked={room.mastic}
            onChange={(e) => (room.mastic = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Mastic
          </Checkbox>
          <Checkbox
            defaultChecked={room.masticPatch}
            onChange={(e) => (room.masticPatch = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Mastic Patch
          </Checkbox>
          <Checkbox
            defaultChecked={room.putty}
            onChange={(e) => (room.putty = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Putty
          </Checkbox>
          <Checkbox
            defaultChecked={room.paint}
            onChange={(e) => (room.paint = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Paint
          </Checkbox>
          <Checkbox
            defaultChecked={room.tenon}
            onChange={(e) => (room.tenon = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Tenon
          </Checkbox>
          <Checkbox
            defaultChecked={room.eC}
            onChange={(e) => (room.eC = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            EC
          </Checkbox>
          <Checkbox
            defaultChecked={room.bottomRail}
            onChange={(e) => (room.bottomRail = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Bottom Rail
          </Checkbox>
          <Checkbox
            defaultChecked={room.pullyWheel}
            onChange={(e) => (room.pullyWheel = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Pully Wheel
          </Checkbox>
          <Checkbox
            defaultChecked={room.casement}
            onChange={(e) => (room.casement = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Casement
          </Checkbox>
          <Checkbox
            defaultChecked={room.concealedVent}
            onChange={(e) => (room.concealedVent = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Concealed Vent
          </Checkbox>
          <Checkbox
            defaultChecked={room.outsidePatch}
            onChange={(e) => (room.outsidePatch = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Outside Facing Patch
          </Checkbox>
          <Checkbox
            defaultChecked={room.shutters}
            onChange={(e) => (room.shutters = e.target.checked)}
            size="md"
            colorScheme="teal"
          >
            Shutter Repairs
          </Checkbox>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

const Create: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const jobRef = useRef<Job>({
    completed: false,
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    address: "",
    email: "",
    phone: "",
    postCode: "",
    rooms: [],
    options: [],
    planningPermission: "Conservation Area",
  });

  const roomRefs = useRef<Room[]>([]);

  const [roomIndexes, setRoomIndexes] = useState<number[]>([0]);

  const addRoom = () => {
    setRoomIndexes((prev) => [...prev, prev.length]);
  };

  const removeRoom = (index: number) => {
    setRoomIndexes((prev) => prev.filter((i) => i !== index));
    roomRefs.current.splice(index, 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect data from refs
    jobRef.current.rooms = roomRefs.current;

    try {
      // Post the job data
      const response = await axiosInstance.post("/api/jobs", jobRef.current);
      const createdJob: Job = response.data as Job;
      toast({
        title: "Job Created",
        description: "The job has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/viewSingle/${createdJob._id}`);
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: "There was an error creating the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Options
  const availableOptions = ["New Windows", "Refurb", "PVC"];

  const planningPermissionOptions = [
    { label: "No Planning", value: "No Planning" },
    {
      label: "Conservation Area",
      value: "Planning Permission: Conservation Area",
    },
    {
      label: "Category A",
      value: "Planning Permission: Conservation Area, Category A",
    },
    {
      label: "Category B",
      value: "Planning Permission: Conservation Area, Category B",
    },
    {
      label: "Category C",
      value: "Planning Permission: Conservation Area, Category C",
    },
  ];

  const formationOptions = [
    { label: "1/1", value: "1/1" },
    { label: "1/2", value: "1/2" },
    { label: "2/1", value: "2/1" },
    { label: "2/2", value: "2/2" },
    { label: "2/4", value: "2/4" },
    { label: "3/1", value: "3/1" },
    { label: "3/1_portrait", value: "3/1_side" },
    { label: "3/2", value: "3/2" },
    { label: "3/3", value: "3/3" },
    { label: "4/1", value: "4/1" },
    { label: "4/2", value: "4/2" },
    { label: "4/4", value: "4/4" },
    { label: "6/1", value: "6/1" },
    { label: "6/1_portrait", value: "6/1_side" },
    { label: "6/2", value: "6/2" },
    { label: "6/2_portrait", value: "6/2_side" },
    { label: "6/4_portrait", value: "6/4_side" },
    { label: "6/6", value: "6/6" },
    { label: "6/6_portrait", value: "6/6_side" },
    { label: "7/1", value: "7/1" },
  ];

  const glassTypeOptions = [
    { label: "Clear", value: "Clear" },
    { label: "Toughened", value: "Toughened" },
    { label: "Obscured", value: "Obscured" },
    { label: "Laminated", value: "Laminated" },
    { label: "Fineo", value: "Fineo" },
  ];

  return (
    <>
      <Navbar />
      <Box maxW="800px" mx="auto" p={4} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Create Job
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* Job Fields */}
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                defaultValue={jobRef.current.date}
                onChange={(e) => (jobRef.current.date = e.target.value)}
                bg="white"
                _focus={{ bg: "white", boxShadow: "outline" }}
                boxShadow="sm"
                borderRadius="md"
                borderColor="gray.300"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Completed</FormLabel>
              <Checkbox
                defaultChecked={jobRef.current.completed}
                onChange={(e) => (jobRef.current.completed = e.target.checked)}
              >
                Is Completed
              </Checkbox>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Customer Name</FormLabel>
              <Input
                type="text"
                defaultValue={jobRef.current.customerName}
                onChange={(e) => (jobRef.current.customerName = e.target.value)}
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
                defaultValue={jobRef.current.email}
                onChange={(e) => (jobRef.current.email = e.target.value)}
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
                defaultValue={jobRef.current.phone}
                onChange={(e) => (jobRef.current.phone = e.target.value)}
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
                defaultValue={jobRef.current.address}
                onChange={(e) => (jobRef.current.address = e.target.value)}
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
                defaultValue={jobRef.current.postCode}
                onChange={(e) => (jobRef.current.postCode = e.target.value)}
                bg="white"
                _focus={{ bg: "white", boxShadow: "outline" }}
                boxShadow="sm"
                borderRadius="md"
                borderColor="gray.300"
              />
            </FormControl>
            {/* Planning Permission */}
            <FormControl isRequired>
              <FormLabel>Planning Permission</FormLabel>
              <MultiOptionToggle
                options={planningPermissionOptions}
                value={jobRef.current.planningPermission}
                onChange={(val) => (jobRef.current.planningPermission = val)}
              />
            </FormControl>
            {/* Options */}
            <FormControl>
              <FormLabel>Options</FormLabel>
              <Stack direction="row" spacing={4}>
                {availableOptions.map((option) => (
                  <Button
                    key={option}
                    colorScheme="teal"
                    variant={
                      jobRef.current.options.includes(option) ? "solid" : "outline"
                    }
                    onClick={() => {
                      let newOptions = [...jobRef.current.options];
                      if (newOptions.includes(option)) {
                        newOptions = newOptions.filter((opt) => opt !== option);
                      } else {
                        newOptions.push(option);
                      }
                      jobRef.current.options = newOptions;
                    }}
                    size="md"
                    borderRadius="md"
                    _focus={{ boxShadow: "outline" }}
                  >
                    {option}
                  </Button>
                ))}
              </Stack>
            </FormControl>
            {/* Rooms */}
            <Heading as="h3" size="md" mt={6}>
              Rooms
            </Heading>
            {roomIndexes.map((roomIndex) => (
              <RoomForm
                key={roomIndex}
                roomIndex={roomIndex}
                removeRoom={removeRoom}
                roomRefs={roomRefs}
                formationOptions={formationOptions}
                glassTypeOptions={glassTypeOptions}
              />
            ))}
            <Button mt={4} onClick={addRoom} colorScheme="teal" variant="outline">
              Add Room
            </Button>
            {/* Submit Button */}
            <Button type="submit" colorScheme="teal" size="lg" mt={6}>
              Create Job
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default Create;
