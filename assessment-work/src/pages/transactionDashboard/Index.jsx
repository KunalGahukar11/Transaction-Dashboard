import React, { useState } from 'react'
import { Col, Divider, Input, Row, Select } from 'antd';
import TransactionTable from './TransactionTable';
import SalesDetails from './SalesDetails';

const { Search } = Input;

const Index = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [searchText, setSearchText] = useState("");

    const dropdownOptions = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    const handleSearch = async (e) => {
        const text = e.target.value.trim();
        setSearchText(text);
    };

    const addMonth = (value) => {
        setSelectedMonth(value);
    };


    return (
        <section>
            <div className='flex justify-center items-center p-3'>
                <h2 className='text-3xl font-bold'>Transaction Dashboard</h2>
            </div>
            <div className='flex justify-between m-5'>
                <div className='w-[45%]'>
                    <Search placeholder='Search for any transaction' onChange={handleSearch} allowClear />
                </div>
                <div className='flex justify-end mr-3 w-[20%]'>
                    <Select placeholder="Select month" options={dropdownOptions} defaultValue="March" style={{ width: "70%" }}
                        onChange={addMonth} value={selectedMonth} allowClear>
                    </Select>
                </div>
            </div>
            <Divider className='bg-gray-300'></Divider>
            <Row gutter={[16, 16]}>
                <Col lg={15}>
                    <TransactionTable searchText={searchText} selectedMonth={selectedMonth}></TransactionTable>
                </Col>
                <Col lg={8}>
                    <SalesDetails selectedMonth={selectedMonth}></SalesDetails>
                </Col>
            </Row>
        </section>
    )
}

export default Index