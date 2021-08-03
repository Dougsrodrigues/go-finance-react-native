import React, { memo, useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { HighlightCard } from "../../components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  User,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from "./styles";

import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expense: HighlightProps;
  total: HighlightProps;
}

export const Dashboard: React.FC = memo(() => {
  const theme = useTheme();
  const { signOut, user } = useAuth();
  const dataKey = `@gofinance:transactions_user:${user.id}`;
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const getLastTransactionData = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ) => {
    const collectionFiltered = collection.filter(
      (transaction: DataListProps) => transaction.type === type
    );

    if (collectionFiltered.length === 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  const loadTransactions = async () => {
    const transactions = await AsyncStorage.getItem(dataKey);

    let entiresTotal = 0;
    let expenseTotal = 0;

    const transactionsParse = transactions ? JSON.parse(transactions) : [];

    const transactionsFormatted: DataListProps[] = transactionsParse.map(
      (transaction: DataListProps) => {
        if (transaction.type === "positive") {
          entiresTotal += Number(transaction.amount);
        } else {
          expenseTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount,
          date,
        };
      }
    );

    const lastTransactionEntries = getLastTransactionData(
      transactionsParse,
      "positive"
    );
    const lastTransactionExpense = getLastTransactionData(
      transactionsParse,
      "negative"
    );
    const totalInterval =
      lastTransactionExpense === 0
        ? "Não há transações"
        : `01 a ${lastTransactionExpense}`;

    const total = entiresTotal - expenseTotal;

    setHighlightData({
      entries: {
        amount: entiresTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expense: {
        amount: expenseTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpense === 0
            ? "Não há transações"
            : `Última saída dia ${lastTransactionExpense}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setTransactions(transactionsFormatted);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => signOut()}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expense?.amount}
              lastTransaction={highlightData?.expense?.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
});
