// src/components/Create.tsx

import React from 'react';
import axiosInstance from "../utils/axiosInstance";
import Navbar from "./NavBar";
import { Job} from "../interfaces";
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
import { Formik, Form, FieldArray, FastField, FieldProps } from 'formik';
import * as Yup from 'yup';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const initialValues: Job = {
    completed: false,
    date: new Date().toISOString().split("T")[0],
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

  const onSubmit = async (values: Job) => {
    try {
      const response = await axiosInstance.post("/api/jobs", values);
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

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    postCode: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    rooms: Yup.array().of(
      Yup.object().shape({
        ref: Yup.string().required('Required'),
        roomName: Yup.string().required('Required'),
        width: Yup.number().required('Required'),
        height: Yup.number().required('Required'),
        count: Yup.number().required('Required'),
        formation: Yup.string().required('Required'),
      })
    ),
  });

  return (
    <>
      <Navbar />
      <Box maxW="800px" mx="auto" p={4} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Create Job
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <VStack spacing={4} align="stretch">
                {/* Job Fields */}
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <FastField name="date">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        type="date"
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl>
                  <FormLabel>Completed</FormLabel>
                  <FastField name="completed">
                    {({ field }: FieldProps<boolean>) => (
                      <Checkbox
                        isChecked={field.value}
                        onChange={(e) => setFieldValue('completed', e.target.checked)}
                      >
                        Is Completed
                      </Checkbox>
                    )}
                  </FastField>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <FastField name="customerName">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <FastField name="email">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        type="email"
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <FastField name="phone">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        type="tel"
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <FastField name="address">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Postcode</FormLabel>
                  <FastField name="postCode">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        bg="white"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        boxShadow="sm"
                        borderRadius="md"
                        borderColor="gray.300"
                      />
                    )}
                  </FastField>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Planning Permission</FormLabel>
                  <MultiOptionToggle
                    options={planningPermissionOptions}
                    value={values.planningPermission}
                    onChange={(val) => setFieldValue('planningPermission', val)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Options</FormLabel>
                  <Stack direction="row" spacing={4}>
                    {availableOptions.map((option) => (
                      <Button
                        key={option}
                        colorScheme="teal"
                        variant={
                          values.options.includes(option) ? "solid" : "outline"
                        }
                        onClick={() => {
                          let newOptions = [...values.options];
                          if (newOptions.includes(option)) {
                            newOptions = newOptions.filter((opt) => opt !== option);
                          } else {
                            newOptions.push(option);
                          }
                          setFieldValue('options', newOptions);
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
                <FieldArray name="rooms">
                  {({ remove, push }) => (
                    <>
                      {values.rooms.map((_, index) => (
                        <RoomForm
                          key={index}
                          index={index}
                          remove={remove}
                          formationOptions={formationOptions}
                          glassTypeOptions={glassTypeOptions}
                        />
                      ))}
                      <Button mt={4} onClick={() => push(initialValues.rooms[0])} colorScheme="teal" variant="outline">
                        Add Room
                      </Button>
                    </>
                  )}
                </FieldArray>
                {/* Submit Button */}
                <Button type="submit" colorScheme="teal" size="lg" mt={6}>
                  Create Job
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

interface RoomFormProps {
  index: number;
  remove: (index: number) => void;
  formationOptions: { label: string; value: string }[];
  glassTypeOptions: { label: string; value: string }[];
}

const RoomForm: React.FC<RoomFormProps> = React.memo(({ index, remove, formationOptions, glassTypeOptions }) => {
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
          Room {index + 1}
        </Heading>
        <Button size="sm" colorScheme="red" onClick={() => remove(index)}>
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
            <FastField name={`rooms.${index}.ref`}>
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
        {/* Room Name */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Room Name</FormLabel>
            <FastField name={`rooms.${index}.roomName`}>
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
        {/* Width */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Width</FormLabel>
            <FastField name={`rooms.${index}.width`}>
              {({ field }: FieldProps<number>) => (
                <Input
                  {...field}
                  type="number"
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
        {/* Height */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Height</FormLabel>
            <FastField name={`rooms.${index}.height`}>
              {({ field }: FieldProps<number>) => (
                <Input
                  {...field}
                  type="number"
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
        {/* Formation */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Formation</FormLabel>
            <FastField name={`rooms.${index}.formation`}>
              {({ field }: FieldProps<string>) => (
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
            </FastField>
          </FormControl>
        </GridItem>
        {/* Glass Type */}
        <GridItem>
          <FormControl>
            <FormLabel>Glass Type</FormLabel>
            <FastField name={`rooms.${index}.glassType`}>
              {({ field }: FieldProps<string>) => (
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
            </FastField>
          </FormControl>
        </GridItem>
        {/* Count */}
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Count</FormLabel>
            <FastField name={`rooms.${index}.count`}>
              {({ field }: FieldProps<number>) => (
                <Input
                  {...field}
                  type="number"
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
        {/* Notes */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <FastField name={`rooms.${index}.notes`}>
              {({ field }: FieldProps<string>) => (
                <Textarea
                  {...field}
                  bg="white"
                  _focus={{ bg: "white", boxShadow: "outline" }}
                  boxShadow="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                />
              )}
            </FastField>
          </FormControl>
        </GridItem>
      </Grid>
      {/* Options */}
      <Box mt={4}>
        <Heading as="h5" size="sm" mb={2}>
          Options
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
          <FastField name={`rooms.${index}.easyClean`}>
            {({ field, form }: FieldProps<boolean>) => (
              <Checkbox
                isChecked={field.value}
                onChange={(e) => form.setFieldValue(field.name, e.target.checked)}
                size="md"
                colorScheme="teal"
              >
                Easy Clean
              </Checkbox>
            )}
          </FastField>
          <FastField name={`rooms.${index}.dormer`}>
            {({ field, form }: FieldProps<boolean>) => (
              <Checkbox
                isChecked={field.value}
                onChange={(e) => form.setFieldValue(field.name, e.target.checked)}
                size="md"
                colorScheme="teal"
              >
                Dormer
              </Checkbox>
            )}
          </FastField>
          {/* Add other checkboxes similarly */}
        </SimpleGrid>
      </Box>
    </Box>
  );
});

export default Create;
