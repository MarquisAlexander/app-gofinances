import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
	TransactionsCard,
	TransactionsCardProps,
} from "../../components/TransactionCard";

import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionsList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionsCardProps {
	id: string;
}

export function Dashboard() {
	const data: DataListProps = [
		{
			id: "1",
			type: "positive",
			title: "Desenvolvimento de software",
			amount: "R$ 12.000,00",
			category: {
				name: "Vendar",
				icon: "dollar-sign",
			},
			date: "13/30/3030",
		},
		{
			id: "2",
			type: "negative",
			title: "xtudo",
			amount: "R$ 12,00",
			category: {
				name: "Alimentação",
				icon: "coffee",
			},
			date: "13/30/3030",
		},
		{
			id: "3",
			type: "negative",
			title: "Aluguel",
			amount: "R$ 1.200,00",
			category: {
				name: "Casa",
				icon: "shopping-bag",
			},
			date: "13/30/3030",
		},
	];

	return (
		<Container>
			<Header>
				<UserWrapper>
					<UserInfo>
						<Photo
							source={{
								uri: "https://avatars.githubusercontent.com/u/51330232?v=4",
							}}
						/>
						<User>
							<UserGreeting>Olá,</UserGreeting>
							<UserName>Marquis</UserName>
						</User>
					</UserInfo>
					<LogoutButton onPress={() => {}}>
						<Icon name="power" />
					</LogoutButton>
				</UserWrapper>
			</Header>

			<HighlightCards>
				<HighlightCard
					type="up"
					title="Entradas"
					amount="R$ 17.400,00"
					lastTransaction="Útima entrada dia 13 de abril"
				/>
				<HighlightCard
					type="down"
					title="Saídas"
					amount="R$ 1.400,00"
					lastTransaction="Útima saída dia 03 de abril"
				/>
				<HighlightCard
					type="total"
					title="Total"
					amount="R$ 16.400,00"
					lastTransaction="01 à 16 de abril"
				/>
			</HighlightCards>
			<Transactions>
				<Title>Listagem</Title>

				<TransactionsList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <TransactionsCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
}
