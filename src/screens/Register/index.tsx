import React, { useState } from "react";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionsTypes,
} from "./styles";

export function Register() {
	const [transactionType, setTransactionType] = useState("");

	function handleTransactionTypeSelect(type: "up" | "down") {
		setTransactionType(type);
	}

	return (
		<Container>
			<Header>
				<Title>Cadastro</Title>
			</Header>

			<Form>
				<Fields>
					<Input placeholder="Nome" />
					<Input placeholder="Preço" />
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
				</Fields>
				<Button title="Enviar" />
			</Form>
		</Container>
	);
}
