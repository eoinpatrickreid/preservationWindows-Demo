// src/components/Create.tsx

import axiosInstance from "../utils/axiosInstance";
import React, { useCallback } from "react";
import Navbar from "./NavBar";
import { Job } from "../interfaces";
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
import { useForm, useFieldArray, Controller } from "react-hook-form";

const RoomForm: React.FC<{
  nestIndex: number;
  control: any;
  removeRoom: (index: number) => void;
  formationOptions: { label: string; value: string }[];
  glassTypeOptions: { label: string; value: string }[];
}> = React.memo(
  ({ nestIndex, control, removeRoom, formationOptions, glassTypeOptions }) => {
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
            Room {nestIndex + 1}
          </Heading>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => removeRoom(nestIndex)}
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
              <Controller
                control={control}
                name={`rooms.${nestIndex}.ref`}
                render={({ field }) => (
                  <Input
                    {...field}
                    bg="white"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    boxShadow="sm"
                    borderRadius="md"
                    borderColor="gray.300"
                  />
                )}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Room Name</FormLabel>
              <Controller
                control={control}
                name={`rooms.${nestIndex}.roomName`}
                render={({ field }) => (
                  <Input
                    {...field}
                    bg="white"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    boxShadow="sm"
                    borderRadius="md"
                    borderColor="gray.300"
                  />
                )}
              />
            </FormControl>
          </GridItem>
          {/* Repeat similar pattern for other inputs */}
          {/* Formation */}
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Formation</FormLabel>
              <Controller
                control={control}
                name={`rooms.${nestIndex}.formation`}
                render={({ field }) => (
                  <Select
                    {...field}
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
                )}
              />
            </FormControl>
          </GridItem>
          {/* Glass Type */}
          <GridItem>
            <FormControl>
              <FormLabel>Glass Type</FormLabel>
              <Controller
                control={control}
                name={`rooms.${nestIndex}.glassType`}
                render={({ field }) => (
                  <Select
                    {...field}
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
                )}
              />
            </FormControl>
          </GridItem>
          {/* Additional inputs like width, height, count, etc., using Controller */}
          {/* Notes */}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Controller
                control={control}
                name={`rooms.${nestIndex}.notes`}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    bg="white"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    boxShadow="sm"
                    borderRadius="md"
                    borderColor="gray.300"
                  />
                )}
              />
            </FormControl>
          </GridItem>
        </Grid>
        {/* Options Section */}
        <Box mt={4}>
          <Heading as="h5" size="sm" mb={2}>
            Options
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
            {/* Example Checkbox */}
            <Controller
              control={control}
              name={`rooms.${nestIndex}.easyClean`}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  size="md"
                  colorScheme="teal"
                >
                  Easy Clean
                </Checkbox>
              )}
            />
            {/* Repeat for other checkboxes */}
          </SimpleGrid>
        </Box>
      </Box>
    );
  }
);

const Create: React.FC = () => {
  const getCurrentDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzoffset).toISOString().split("T")[0];
  };

  const defaultValues: Job = {
    completed: false,
    date: getCurrentDate(),
    customerName: "",
    address: "",
    email: "",
    phone: "",
    postCode: "",
    rooms: [
      {
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
      },
    ],
    options: [],
    planningPermission: "Conservation Area",
  };

  const { control, handleSubmit } = useForm<Job>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rooms",
  });

  const toast = useToast();
  const navigate = useNavigate();

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
      value: "Planning Permission: Concervation Area, Category A",
    },
    {
      label: "Category B",
      value: "Planning Permission: Concervation Area, Category B",
    },
    {
      label: "Category C",
      value: "Planning Permission: Concervation Area, Category C",
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

  const onSubmit = async (data: Job) => {
    try {
      const response = await axiosInstance.post("/api/jobs", data);
      console.log("Job created:", response.data);
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

  const addRoom = useCallback(() => {
    append({
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
    });
  }, [append]);

  return (
    <>
      <Navbar />
      <Box maxW="800px" mx="auto" p={4} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Create Job
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            {/* Job Fields */}
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    bg="white"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    boxShadow="sm"
                    borderRadius="md"
                    borderColor="gray.300"
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Completed</FormLabel>
              <Controller
                control={control}
                name="completed"
                render={({ field }) => (
                  <Checkbox
                    name={field.name}
                    ref={field.ref}
                    isChecked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                  >
                    Is Completed
                  </Checkbox>
                )}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Customer Name</FormLabel>
              <Controller
                control={control}
                name="customerName"
                render={({ field }) => (
                  <Input
                    {...field}
                    bg="white"
                    _focus={{ bg: "white", boxShadow: "outline" }}
                    boxShadow="sm"
                    borderRadius="md"
                    borderColor="gray.300"
                  />
                )}
              />
            </FormControl>
            {/* Repeat for other job fields */}
            <FormControl isRequired>
              <FormLabel>Planning Permission</FormLabel>
              <Controller
                control={control}
                name="planningPermission"
                render={({ field }) => (
                  <MultiOptionToggle
                    options={planningPermissionOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Options</FormLabel>
              <Controller
                control={control}
                name="options"
                render={({ field }) => (
                  <Stack direction="row" spacing={4}>
                    {availableOptions.map((option) => (
                      <Button
                        key={option}
                        colorScheme="teal"
                        variant={
                          field.value.includes(option) ? "solid" : "outline"
                        }
                        onClick={() => {
                          let newOptions = [...field.value];
                          if (newOptions.includes(option)) {
                            newOptions = newOptions.filter(
                              (opt) => opt !== option
                            );
                          } else {
                            newOptions.push(option);
                          }
                          field.onChange(newOptions);
                        }}
                        size="md"
                        borderRadius="md"
                        _focus={{ boxShadow: "outline" }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Stack>
                )}
              />
            </FormControl>

            {/* Rooms Section */}
            <Heading as="h3" size="md" mt={6}>
              Rooms
            </Heading>
            {fields.map((item, index) => (
              <RoomForm
                key={item.id}
                nestIndex={index}
                control={control}
                removeRoom={remove}
                formationOptions={formationOptions}
                glassTypeOptions={glassTypeOptions}
              />
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
              Create Job
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default Create;
