import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDatabase } from "app/shared/contexts/database";

import { ScreenWrapper } from "app/shared/components/screen-wrapper";
import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text, TextVariants } from "app/shared/components/text";
import { TextField } from "app/shared/components/text-field";
import { Button } from "app/shared/components/button";

import { SVGArrowLeft } from "app/shared/assets/icons/arrow-left";

import { schema } from "app/shared/utils/register-order-schema";

interface RegisterOrderFormData {
  hash: string;
  identifier: string;
}

export function RegisterOrderScreen() {
  const { instance } = useDatabase();
  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm<RegisterOrderFormData>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: RegisterOrderFormData) {
    instance
      ?.transaction((transtaction) => {
        transtaction.executeSql(
          `
        INSERT INTO ORDERS (hash, identifier) VALUES (?, ?)
      `,
          [data.hash, data.identifier]
        );
      })
      .finally(() => navigation.goBack());
  }

  return (
    <ScreenWrapper>
      <Row p="16px" alignItems="center">
        <BorderlessButton onPress={() => navigation.goBack()}>
          <SVGArrowLeft />
        </BorderlessButton>

        <Text
          ml="32px"
          variant={TextVariants.MEDIUM}
          fontSize="20px"
          letterSpacing="0.5px"
        >
          Register order
        </Text>
      </Row>

      <Column flex={1} p="16px" justifyContent="center">
        <Controller
          name="hash"
          control={control}
          defaultValue=""
          render={({ value, onBlur, onChange }) => (
            <TextField
              placeholder="Hash"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.hash?.message}
            />
          )}
        />

        <Controller
          name="identifier"
          control={control}
          defaultValue=""
          render={({ value, onBlur, onChange }) => (
            <TextField
              placeholder="Identifier"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.identifier?.message}
            />
          )}
        />
      </Column>

      <Column p="16px">
        <Button text="Complete Registration" onPress={handleSubmit(onSubmit)} />
      </Column>
    </ScreenWrapper>
  );
}
