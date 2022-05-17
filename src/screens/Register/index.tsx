import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionsTypes,
} from "./styles";

interface FormData {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required("Nome é obrigatório"),
	amount: Yup.number()
		.typeError("Informe um valor númerico")
		.positive("O valor não pode ser negativo")
		.required("O valor é obrigatório"),
});

export function Register() {
	const [transactionType, setTransactionType] = useState("");
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);

	const [category, setCategory] = useState({
		key: "category",
		name: "Categoria",
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function handleTransactionTypeSelect(type: "up" | "down") {
		setTransactionType(type);
	}

	function handleOpenSelectCategoryModal() {
		setCategoryModalOpen(true);
	}

	function handleCloseSelectCategoryModal() {
		setCategoryModalOpen(false);
	}

	function handleRegister(form: FormData) {
		if (!transactionType) return Alert.alert("Selecione o tipo da transação");

		if (category.key === "category")
			return Alert.alert("Selecione uma categoria");

		const data = {
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key,
		};
		console.log(data);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>

				<Form>
					<Fields>
						<InputForm
							name="name"
							control={control}
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							name="amount"
							control={control}
							placeholder="Proço"
							keyboardType="numeric"
							error={errors.amount && errors.amount.message}
						/>
						<TransactionsTypes>
							<TransactionTypeButton
								onPress={() => handleTransactionTypeSelect("up")}
								isActive={transactionType === "up"}
								type="up"
								title="Income"
							/>
							<TransactionTypeButton
								onPress={() => handleTransactionTypeSelect("down")}
								isActive={transactionType === "down"}
								type="down"
								title="Outcome"
							/>
						</TransactionsTypes>
						<CategorySelectButton
							title={category.name}
							onPress={handleOpenSelectCategoryModal}
						/>
					</Fields>
					<Button title="Enviar" onPress={handleSubmit(handleRegister)} />
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseSelectCategoryModal}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
}
