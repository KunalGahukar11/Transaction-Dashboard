import React, { useState, useEffect } from 'react';
import { message, Card } from 'antd';
import { getSearchQuery } from '../../api/transaction';

const SalesDetails = ({ selectedMonth }) => {
    const [totalSaleAmount, setTotalSaleAmount] = useState(0);
    const [totalSoldItems, setTotalSoldItems] = useState(0);
    const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

    const fetchSalesData = async () => {
        try {
            if (!selectedMonth) {
                setTotalSoldItems(0);
                setTotalNotSoldItems(0);
                setTotalSaleAmount(0);
                return;
            };

            const result = await getSearchQuery("", selectedMonth);

            if (result.success) {
                const transactions = result.data;

                const soldItems = transactions.filter(item => item.sold);
                const notSoldItems = transactions.filter(item => !item.sold);

                const totalSales = soldItems.reduce((sum, item) => sum + item.price, 0);

                setTotalSaleAmount(totalSales);
                setTotalSoldItems(soldItems.length);
                setTotalNotSoldItems(notSoldItems.length);
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong while fetching sales data!");
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [selectedMonth]);

    return (
        <section>
            <h2 className='text-2xl font-medium m-3'>Satistics {selectedMonth ? selectedMonth : "No month selected"}</h2>

            <div className="flex justify-around my-5">
                <Card>
                    <div className='flex items-center gap-2 font-medium text-lg'>
                        <h3 className="text-lg font-semibold">Total Sale Amount</h3>
                        <p className="text-lg font-semibold">{totalSaleAmount.toFixed(2)}</p>
                    </div>
                    <div className='flex items-center gap-2 font-medium text-lg'>
                        <h3 className="text-lg font-semibold">Total Sold Items</h3>
                        <p className="text-lg font-semibold">{totalSoldItems}</p>
                    </div>
                    <div className='flex items-center gap-2 font-medium text-lg'>
                        <h3 className="text-lg font-semibold">Total Not Sold Items</h3>
                        <p className="text-lg font-semibold">{totalNotSoldItems}</p>
                    </div>
                </Card>
            </div>

        </section>
    )
}

export default SalesDetails