import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components";
import { HistoryCard } from "../../components/HistoryCard";
import {
	Container,
	Header,
	Title,
	Content,
	ChartContainer,
	MonthSelect,
	MonthSelectButton,
	MonthSelectIcon,
	Month,
} from "./styles";
import { categories } from "../../utils/categories";

export interface TransactionData {
	type: "positive" | "negative";
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface CategoryData {
	key: string;
	name: string;
	total: number;
	totalFormatted: string;
	color: string;
	percent: string;
}

export function Resume() {
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
		[],
	);

	const theme = useTheme();

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const datakey = "@gofinances:transactions";
		const response = await AsyncStorage.getItem(datakey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expensives = responseFormatted.filter(
			(expensive: TransactionData) => expensive.type === "negative",
		);

		const expensivesTotal = expensives.reduce(
			(acumullator: number, expensive: TransactionData) => {
				return acumullator + Number(expensive.amount);
			},
			0,
		);

		console.log(expensivesTotal);

		const totalByCategory: CategoryData[] = [];

		categories.forEach((category) => {
			let categorySum = 0;

			expensives.forEach((expensive: TransactionData) => {
				if (expensive.category === category.key) {
					categorySum += Number(expensive.amount);
				}
			});

			if (categorySum > 0) {
				const total = categorySum.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				});

				const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
					0,
				)}%`;

				totalByCategory.push({
					key: category.key,
					name: category.name,
					color: category.color,
					total: categorySum,
					totalFormatted: total,
					percent,
				});
			}
		});

		setTotalByCategories(totalByCategory);
	}

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<Content
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: useBottomTabBarHeight(),
				}}
			>
				<MonthSelect>
					<MonthSelectButton>
						<MonthSelectIcon name="chevron-left" />
					</MonthSelectButton>
					<Month>Maio</Month>
					<MonthSelectButton>
						<MonthSelectIcon name="chevron-right" />
					</MonthSelectButton>
				</MonthSelect>

				<ChartContainer>
					<VictoryPie
						data={totalByCategories}
						colorScale={totalByCategories.map((category) => category.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: "bold",
								fill: theme.colors.shape,
							},
						}}
						labelRadius={50}
						x="percent"
						y="total"
					/>
				</ChartContainer>
				{totalByCategories.map((item) => (
					<HistoryCard
						key={item.key}
						title={item.name}
						amount={item.totalFormatted}
						color={item.color}
					/>
				))}
			</Content>
		</Container>
	);
}
