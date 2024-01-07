/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTodo } from "../graphql/mutations";
const client = generateClient();
export default function TodoCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    text: "",
    complete: false,
    yyyymmdd: "",
    user: "",
    customID: "",
  };
  const [text, setText] = React.useState(initialValues.text);
  const [complete, setComplete] = React.useState(initialValues.complete);
  const [yyyymmdd, setYyyymmdd] = React.useState(initialValues.yyyymmdd);
  const [user, setUser] = React.useState(initialValues.user);
  const [customID, setCustomID] = React.useState(initialValues.customID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setText(initialValues.text);
    setComplete(initialValues.complete);
    setYyyymmdd(initialValues.yyyymmdd);
    setUser(initialValues.user);
    setCustomID(initialValues.customID);
    setErrors({});
  };
  const validations = {
    text: [],
    complete: [],
    yyyymmdd: [],
    user: [],
    customID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          text,
          complete,
          yyyymmdd,
          user,
          customID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTodo.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TodoCreateForm")}
      {...rest}
    >
      <TextField
        label="Text"
        isRequired={false}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text: value,
              complete,
              yyyymmdd,
              user,
              customID,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <SwitchField
        label="Complete"
        defaultChecked={false}
        isDisabled={false}
        isChecked={complete}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              text,
              complete: value,
              yyyymmdd,
              user,
              customID,
            };
            const result = onChange(modelFields);
            value = result?.complete ?? value;
          }
          if (errors.complete?.hasError) {
            runValidationTasks("complete", value);
          }
          setComplete(value);
        }}
        onBlur={() => runValidationTasks("complete", complete)}
        errorMessage={errors.complete?.errorMessage}
        hasError={errors.complete?.hasError}
        {...getOverrideProps(overrides, "complete")}
      ></SwitchField>
      <TextField
        label="Yyyymmdd"
        isRequired={false}
        isReadOnly={false}
        value={yyyymmdd}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              complete,
              yyyymmdd: value,
              user,
              customID,
            };
            const result = onChange(modelFields);
            value = result?.yyyymmdd ?? value;
          }
          if (errors.yyyymmdd?.hasError) {
            runValidationTasks("yyyymmdd", value);
          }
          setYyyymmdd(value);
        }}
        onBlur={() => runValidationTasks("yyyymmdd", yyyymmdd)}
        errorMessage={errors.yyyymmdd?.errorMessage}
        hasError={errors.yyyymmdd?.hasError}
        {...getOverrideProps(overrides, "yyyymmdd")}
      ></TextField>
      <TextField
        label="User"
        isRequired={false}
        isReadOnly={false}
        value={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              complete,
              yyyymmdd,
              user: value,
              customID,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <TextField
        label="Custom id"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={customID}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              text,
              complete,
              yyyymmdd,
              user,
              customID: value,
            };
            const result = onChange(modelFields);
            value = result?.customID ?? value;
          }
          if (errors.customID?.hasError) {
            runValidationTasks("customID", value);
          }
          setCustomID(value);
        }}
        onBlur={() => runValidationTasks("customID", customID)}
        errorMessage={errors.customID?.errorMessage}
        hasError={errors.customID?.hasError}
        {...getOverrideProps(overrides, "customID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
