import React from 'react'
import {Container, Title, Amount, Footer, Category, Icon, CategoryName, Date} from './styles';

export function TransactionsCard() {
    return (
        <Container>
            <Title>Desenvolvimento de softwate</Title>

            <Amount>R$ 12.000,00</Amount>
            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/08/2021</Date>
            </Footer>
        </Container>
    )
}