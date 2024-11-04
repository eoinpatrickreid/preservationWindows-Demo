// src/components/EditJob.tsx

import React, { useEffect } from "react";
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
import MultiOptionToggle from "./MultiOptionToggle";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  // Use React Hook Form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Job>({
    defaultValues: {
      completed: false,
      date: "",
      customerName: "",
      address: "",
      email: "",
      phone: "",
      postCode: "",
      rooms: [],
      options: [],
      planningPermission: "",
    },
  });

  // Use useFieldArray for dynamic room fields
  const {
    fields: rooms,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "rooms",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get<Job>(`/api/jobs/${id}`);
        const jobData = response.data;

        // Reset the form with fetched data
        reset(jobData);

        // Replace the rooms in the field array
        replace(jobData.rooms);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch job details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchJob();
  }, [id, reset, replace, toast]);

  const onSubmit = async (data: Job) => {
    try {
      await axiosInstance.put(`/api/jobs/${id}`, data);
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

  // Options available for the job options field
  // Options available for the job options field
  const availableOptions = ["New Windows", "Refurb", "PVC"];

  // Define Planning Permission options
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
    { label: "placeholder", value: "placeholder" },
  ];

  const glassTypeOptions = [
    { label: "Clear", value: "Clear" },
    { label: "Toughened", value: "Toughened" },
    { label: "Obscured", value: "Obscured" },
    { label: "Laminated", value: "Laminated" },
    { label: "Fineo", value: "Fineo" },
  ];

  // Extract boolean keys from Room
  type RoomBooleanKeys = {
    [K in keyof Room]-?: NonNullable<Room[K]> extends boolean ? K : never;
  }[keyof Room];

  type RoomOptionPath = `rooms.${number}.${RoomBooleanKeys}`;

  const roomOptionFields: { name: RoomBooleanKeys; label: string }[] = [
    { name: "easyClean", label: "Easy Clean" },
    { name: "dormer", label: "Dormer" },
    { name: "mastic", label: "Mastic" },
    { name: "masticPatch", label: "Mastic Patch" },
    { name: "putty", label: "Putty" },
    { name: "paint", label: "Paint" },
    { name: "tenon", label: "Tenon" },
    { name: "eC", label: "EC" },
    { name: "bottomRail", label: "Bottom Rail" },
    { name: "pullyWheel", label: "Pully Wheel" },
    { name: "casement", label: "Casement" },
    { name: "concealedVent", label: "Concealed Vent" },
    { name: "outsidePatch", label: "Outside Facing Patch" },
    { name: "shutters", label: "Shutter Repairs" },
  ];

  // Function to add a new room
  const addRoom = () => {
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
      customFormation: "",
      glassType: "Clear",
      casement: false,
      priceChange: 0,
      priceChangeNotes: "",
      masticPatch: false,
      outsidePatch: false,
      concealedVent: false,
      shutters: false,
    });
  };

  // Loading state
  if (rooms.length === 0 && !isSubmitting) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading job details...</Text>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box maxW="800px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Edit Job
        </Heading>
        <Box bg="#B5C9BD" p={6} borderRadius="md" boxShadow="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              {/* Job Fields */}
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  {...register("date", { required: true })}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Completed</FormLabel>
                <Controller
                  control={control}
                  name="completed"
                  render={({ field }) => {
                    const { value, ...rest } = field;
                    return (
                      <Checkbox
                        {...rest}
                        isChecked={value as boolean}
                        onChange={(e) => field.onChange(e.target.checked)}
                      >
                        Is Completed
                      </Checkbox>
                    );
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  {...register("customerName", { required: true })}
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
                  {...register("email")}
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
                  {...register("phone")}
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
                  {...register("address", { required: true })}
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
                  {...register("postCode", { required: true })}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              </FormControl>
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
                      bg="white"
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
              {rooms.map((room, index) => (
                <Box
                  key={room.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mt={4}
                  bg="white"
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
                      onClick={() => remove(index)}
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
                          {...register(`rooms.${index}.ref`, {
                            required: true,
                          })}
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
                          {...register(`rooms.${index}.roomName`, {
                            required: true,
                          })}
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
                        <Controller
                          control={control}
                          name={`rooms.${index}.width`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Height</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.height`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Formation</FormLabel>
                        <Select
                          {...register(`rooms.${index}.formation`, {
                            required: true,
                          })}
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
                      <FormLabel>Custom Formation</FormLabel>
                      <Input
                        type="text"
                        {...register(`rooms.${index}.customFormation`)}
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    </FormControl>
                  </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Glass Type</FormLabel>
                        <Select
                          {...register(`rooms.${index}.glassType`)}
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
                        <Controller
                          control={control}
                          name={`rooms.${index}.count`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>New Panes</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.panesNumber`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Stain Repairs</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.stainRepairs`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Encapsulation</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.encapsulation`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    {/* Cill Field */}
                    <GridItem>
                      <FormControl>
                        <FormLabel>Cill</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.cill`}
                          render={({ field }) => (
                            <MultiOptionToggle
                              options={[
                                { label: "None", value: "" },
                                { label: "Full", value: "Full" },
                                { label: "Half", value: "Half" },
                                { label: "Repairs", value: "Repairs" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </FormControl>
                    </GridItem>

                    {/* Sash Field */}
                    <GridItem>
                      <FormControl>
                        <FormLabel>Sash</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.sash`}
                          render={({ field }) => (
                            <MultiOptionToggle
                              options={[
                                { label: "None", value: "" },
                                { label: "Top", value: "Top" },
                                { label: "Bottom", value: "Bottom" },
                                { label: "Both", value: "Both" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Price Change (%)</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.priceChange`}
                          render={({ field }) => (
                            <NumberInput
                              min={-100}
                              step={0.05}
                              precision={1}
                              clampValueOnBlur={false}
                              value={field.value}
                              onChange={(valueString) => {
                                const parsedValue = parseFloat(valueString);
                                field.onChange(
                                  isNaN(parsedValue) ? "" : parsedValue
                                );
                              }}
                            >
                              <NumberInputField
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
                          )}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Price Change Notes</FormLabel>
                        <Input
                          type="text"
                          {...register(`rooms.${index}.priceChangeNotes`)}
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
                          {...register(`rooms.${index}.notes`)}
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
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
                      {roomOptionFields.map((option) => (
                        <Controller<Job, RoomOptionPath>
                          key={option.name}
                          control={control}
                          name={
                            `rooms.${index}.${option.name}` as RoomOptionPath
                          }
                          render={({ field }) => {
                            const { value, ...rest } = field;
                            return (
                              <Checkbox
                                {...rest}
                                isChecked={value as boolean}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                size="md"
                                colorScheme="teal"
                              >
                                {option.label}
                              </Checkbox>
                            );
                          }}
                        />
                      ))}
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
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                mt={6}
                isLoading={isSubmitting}
              >
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
