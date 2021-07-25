import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

interface TransactionData {
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

export const Resume: React.FC = () => {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const dataKey = "@gofinance:transactions";

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: TransactionData) => expense.type === "negative"
    );

    const expensesTotal = expenses.reduce(
      (total: number, expense: TransactionData) => {
        return total + Number(expense.amount);
      },
      0
    );

    console.log(expensesTotal);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useLayoutEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shapes,
              },
            }}
            labelRadius={50}
            colorScale={totalByCategories.map((category) => category.color)}
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
};
