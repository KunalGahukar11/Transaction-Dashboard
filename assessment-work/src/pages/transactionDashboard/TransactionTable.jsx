import React, { useEffect, useState } from 'react'
import { getAllTransactions, getSearchQuery } from '../../api/transaction';
import { message, Table } from 'antd';

const TransactionTable = ({ searchText, selectedMonth }) => {
    const [transactionInfo, setTransactionInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const columns = [
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Sold", dataIndex: "sold", key: "sold", render: (sold) => (sold ? "Yes" : "No") },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (url) => (
                <img src={url} alt="Product" style={{ width: 50, height: 50, objectFit: "cover" }} />
            ),
        },
    ];

    const getAllTransactionInfo = async (page = 1) => {
        try {
            const response = await getAllTransactions(page);
            if (response.success) {
                setTotalRecords(response.total);
                setTransactionInfo(response.data.map(item => ({ ...item, key: item.id })));
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong!");
        }
    };

    const fetchSearchResults = async () => {
        try {
            if (!searchText && !selectedMonth) {
                getAllTransactionInfo(currentPage);
                return;
            }

            const result = await getSearchQuery(searchText, selectedMonth);
            if (result.success) {
                setTransactionInfo(result.data);
                setTotalRecords(result.total || result.data.length);
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong!");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchSearchResults();
    }, [searchText, selectedMonth, currentPage]);

    return (
        <section>
            <h2 className='text-2xl font-medium m-3'>Transaction Table</h2>
            <Table
                columns={columns}
                dataSource={transactionInfo}
                pagination={{
                    pageSize: 10,
                    current: currentPage,
                    total: totalRecords,
                    onChange: handlePageChange,
                }}
            />
        </section>
    );
};

export default TransactionTable;
